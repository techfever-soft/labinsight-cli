import axios from "axios";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { input } from "@inquirer/prompts";
import chalk from "chalk";
import { LabInsightLogger } from "../lib/classes/logger.class";
import path from "path";
import os from "os";
import fs from "fs";

const logger = new LabInsightLogger();

const getSessionId = async () => {
  try {
    const { data } = (await axios.get(
      "http://localhost:8080/api/v1/auth/initiate"
    )) as any;
    return data.sessionId;
  } catch (error) {
    console.error("Error getting sessionId: ", error);
    throw error;
  }
};

export const login = async () => {
  const cacheExists = fs.existsSync(
    path.join(os.homedir(), ".labinsight-cache")
  );

  if (cacheExists) {
    fs.readFile(path.join(os.homedir(), ".labinsight-cache"), (err, data) => {
      if (err) {
        console.error("Error reading cache: ", err);
      } else {
        const cacheContent = JSON.parse(data.toString());

        logger.log(
          "info",
          "Already logged in as " + chalk.bold(cacheContent.email) + " !"
        );
        logger.log("info", "Use 'labinsight logout' to log out.");
        return;
      }
    });
  } else {
    const sessionId = await getSessionId();
    console.log(
      `Use the following URL to authenticate : ${chalk.bold(
        `http://localhost:4200/auth/login?sessionId=${sessionId}`
      )}`
    );

    logger.spacing();
    console.log("Waiting for authentication...");
    logger.spacing();

    let code = null;
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/auth/status?sessionId=${sessionId}`
        );
        const data = res.data as any;

        if (data.state === "authenticated" && data.code) {
          code = data.code;
          clearInterval(interval); // Stopper l'intervalle

          try {
            const res = await axios.post(
              `http://localhost:8080/api/v1/auth/callback`,
              {
                code,
                sessionId,
              }
            );
            const data = res.data as any;
            if (data.success) {
              // Store the token in the user's home directory
              await storeUidLocally(data.uid, data.email, code);

              logger.log(
                "success",
                "Successfully logged in as " + chalk.bold(data.email) + " !"
              );
              logger.log("info", "Use 'labinsight logout' to log out.");
            } else {
              console.error("Error logging in: ", data);
            }
          } catch (error) {
            console.error("Error sending code for token: ", error);
          }
        }
      } catch (error) {
        console.error("Error fetching status: ", error);
      }
    }, 1000);
  }
};

const storeUidLocally = async (uid: string, email: string, code: string) => {
  try {
    fs.writeFile(
      path.join(os.homedir(), ".labinsight-cache"),
      JSON.stringify({
        uid,
        email,
        token: code,
      }),
      (err) => {
        if (err) {
          console.error("Error writing to cache: ", err);
        }
      }
    );
  } catch (error) {
    console.error("Error storing UID locally: ", error);
  }
};
