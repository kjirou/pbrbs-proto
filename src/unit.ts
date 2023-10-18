import type { Job } from "./job";

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
   * 1以上の整数。
   * 組織の成長に伴い上昇し、ユニット生成時に固定され不変。
   * 不変なのは、以下の理由から:
   * - 生成したユニットとパーティを陳腐化させるため
   * - フレーバーとして組織の対外的な成長を表現するため
   *   - ユニットのレベルが成長すると、新規生成するユニットとの差が一見わからなくなる
   * - レベルアップのための経験値設計が不要になるため
   */
  level: number;
  /** いわゆるライフ。0になると戦闘不能になる。 */
  lifePoints: number;
  /**
   * マスを占有する際の種別
   *
   * 1マスに"main"と"sub"それぞれ1ユニットずつ置くことができる。
   * "sub"は主に土嚢・バリスタ・トーテムなどの補助的なユニットを置くために使用する。
   */
  occupationKind: "main" | "sub";
  /**
   * スキル点
   *
   * 消費してスキルを習得する。
   * 1冒険終了毎に5獲得でき、職業Lv1パックスキル取得に1、職業Lv2パックスキル取得に2、職業Lv3パックスキル取得に3、必要になる。
   * 同パックのスキルを1つ獲得する度に2倍,3倍...となる。
   */
  skillPoints: number;
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
