import type { Job } from "./job";

/**
 * 必要経験点リスト
 *
 * 1->2レベルに必要な値...9->10レベルに必要な値のリスト。
 */
type RequiredExperiencePointsList = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

/**
 * ユニット
 *
 * 各値は"capability value"(性能値)と表記する。あまり変わらない方の"ability value"(能力値)とは区別する。
 */
export type Unit = {
  /**
   * 能力値群
   *
   * それぞれ 1 以上の整数。
   */
  abilityValues: {
    agility: number;
    intelligence: number;
    strength: number;
  };
  /** いわゆるAP。0以上の整数。 */
  actionPoints: number;
  /** いわゆる装甲 or シールド。0以上の整数。lifeの代わりに減少する一時的なlife。基本的には次ターン開始前に0になる。 */
  armorPoints: number;
  jobId: Job["id"];
  /**
   * ユニットレベル
   *
   * 経験点を消費して能動的に決定をすることで上がる。
   * 総経験点から参照透過で決定するのは、レベルアップに伴う意思決定ができないことや、必要経験点調整時にレベルの変化が発生するのでNG。
   */
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  /** いわゆるライフ。0になると戦闘不能になる。 */
  lifePoints: number;
  /**
   * マスを占有する際の種別
   *
   * 1マスに"main"と"sub"それぞれ1ユニットずつ置くことができる。
   * "sub"は主に土嚢・バリスタ・トーテムなどの補助的なユニットを置くために使用する。
   */
  occupationKind: "main" | "sub";
};

export const computeMaxLifePoints = (params: { unit: Unit }): number =>
  10 + params.unit.abilityValues.strength + params.unit.level;

export const computeActionPointsAtStartOfTurn = (params: {
  unit: Unit;
}): number => 3;

export const computeArmorPointsAtStartOfTurn = (params: {
  unit: Unit;
}): number => 0;

export const computeAttackPoints = (params: { unit: Unit }): number => 1;

export const computeDefencePoints = (params: { unit: Unit }): number => 1;

export const computeMagicalAttackPoints = (params: { unit: Unit }): number => 1;

export const computeMagicalDefencePoints = (params: { unit: Unit }): number =>
  1;
