import {
  LabInsightProjectCasing,
  LabInsightProjectEngine,
  LabInsightProjectType,
  LabInsignhtProjectLinting,
} from "../types/project.type";

import { LabInsightEnvironment } from "../types/environment.type";

export interface LabInsightConfig {
  version: number; // Version du fichier de configuration
  projectName: string; // Nom du projet
  projectType: LabInsightProjectType; // Type de projet
  engine: LabInsightProjectEngine; // Moteur de rendu
  enviroment: LabInsightEnvironment; // Environnement de travail
  port: number; // Port du serveur
  host: string; // Hôte du serveur

  srcFolder: string; // Dossier source
  distFolder: string; // Dossier de distribution

  linting: LabInsignhtProjectLinting; // Outil de linting
  casing: LabInsightCasingOptions; // Options de casing
  options: LabInsightConfigOptions; // Options de configuration
  decorators: LabInsightDecoratorOptions; // Options de décoration
}

export interface LabInsightDecoratorOptions {
  classDecorators?: boolean; // Utilisation des décorateurs de classe
  methodDecorators?: boolean; // Utilisation des décorateurs de méthode
  propertyDecorators?: boolean; // Utilisation des décorateurs de propriété
  parameterDecorators?: boolean; // Utilisation des décorateurs de paramètre
}

export interface LabInsightCasingOptions {
  variableCasing?: LabInsightProjectCasing; // Casing des variables
  parameterCasing?: LabInsightProjectCasing; // Casing des paramètres
  propertyCasing?: LabInsightProjectCasing; // Casing des propriétés
  methodCasing?: LabInsightProjectCasing; // Casing des méthodes
  classCasing?: LabInsightProjectCasing; // Casing des classes
  typeCasing?: LabInsightProjectCasing; // Casing des types
  interfaceCasing?: LabInsightProjectCasing; // Casing des interfaces
  enumCasing?: LabInsightProjectCasing; // Casing des énumérations
}

export interface LabInsightConfigOptions {
  silent: boolean; // Désactive les messages de la CLI
 
  // Rules de linting
  maxFileLines?: number; // Limite le nombre de lignes par fichier
  functionMaxLines?: number; // Limite le nombre de lignes par fonction
  consistentFunctionNaming?: boolean; // Assure une cohérence dans la nomination des fonctions
  noLargeClasses?: boolean; // Limite le nombre de membres dans une classe
  requireMethodDescription?: boolean; // Oblige la documentation des méthodes
  requireParameterAnnotations?: boolean; // Oblige l’annotation des paramètres des méthodes
  requireReturnAnnotations?: boolean; // Oblige l’annotation des retours des méthodes
  requireTryCatch?: boolean; // Oblige l'utilisation de try-catch pour les méthodes critiques
  noEmptyCatchBlocks?: boolean; // Interdit les blocs catch vides
  limitRecursionDepth?: number; // Limite la profondeur de récursion
  maxArrayLength?: number; // Limite la longueur des tableaux
  noEval?: boolean; // Interdit l’utilisation de eval
  noGlobalState?: boolean; // Interdit les variables globales
  noInlineScripts?: boolean; // Interdit les scripts en ligne
  requireAriaLabels?: boolean; // Exige l'ajout de labels ARIA pour les éléments interactifs
  colorContrastCheck?: boolean; // Assure un contraste adéquat entre le texte et les arrière-plans
  jsDoc?: boolean; // Oblige l'utilisation de JSDoc pour la documentation des méthodes
  preferArrowFunctions?: boolean; // Favorise les fonctions fléchées
  noImplicitAny?: boolean; // Empêche l'utilisation implicite de any en TypeScript
  noImplicitReturns?: boolean; // Assure que toutes les fonctions doivent retourner explicitement une valeur
  strictNullChecks?: boolean; // Active la vérification stricte des null et undefined
  strictPropertyInitialization?: boolean; // Exige que toutes les propriétés soient initialisées
  noUnusedParameters?: boolean; // Interdit les paramètres non utilisés
}
