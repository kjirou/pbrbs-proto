import { ParameterModification } from "../parameterModification";

type RelativeSide = "ally" | "enemy";

type TargettableArea =
  | "allOnAllySide"
  | "allOnEnemySide"
  | "around"
  | "crossShaped"
  | "frontEnemyLane"
  | "frontThreeEnemyLanes"
  | "self";

/**
 * - targetKind="cell" & targettableArea="self" は、userPositionRelative で表現するので使わない予定。 // TODO: 型にする。
 * - targetKind="object" & targettableArea="self" は、操作フロー上は対象選択を省略する。
 */
type Targetting = Readonly<{
  targetKind: "cell" | "object";
  targettableArea: TargettableArea;
  // TODO: enemy側が選択するときや、こちらで自動決定する時の設定
}>;

type UserPositionRelativeEffectArea =
  | "around"
  | "breath"
  | "crossShaped"
  | "frontEnemyLane"
  | "frontThreeEnemyLanes"
  | "frontTwoEnemyLanes"
  | "powerfulBreath"
  | "within0"
  | "within1"
  | "within2"
  | "within3"
  | "within4"
  | "within5";

type UserSideRelativeEffectArea =
  | "allOnAllySide"
  | "allOnEnemySide"
  | "frontLineOnEnemySide"
  | "frontTwoLinesOnEnemySide";

/**
 * 効果範囲と対象選択
 *
 * ---
 *
 * 要件:
 *
 * - 対象選択が必要な単体攻撃で敵を攻撃する。
 * - 中心の選択が必要な範囲攻撃で敵を攻撃する。
 * - 中心の選択が必要ではない範囲攻撃で敵を攻撃する。
 * - 行動者自身を対象とする効果を発動する。
 * - 行動者自身を中心とした範囲を対象とする効果を発動する。
 *
 * ---
 *
 * 操作フロー例:
 *
 * 対象選択が必要な単体攻撃で敵を攻撃する:
 * - ユーザーがスキルをタップ
 * - 選択可能な敵が強調表示
 * - 選択したい敵をユーザーがタップ
 * - その敵に効果が発生する
 *
 * 中心の選択が必要ではない範囲攻撃で敵を攻撃する:
 * - ユーザーがスキルをタップ
 * - そのセルを中心とした範囲内の敵に効果が発生する
 *
 * TODO: 効果範囲が事前にわからない。タップ数を増やすのはNGなので、効果範囲決定時もタップを要する別操作モードにすぐ切り替えられるようにするのが良さそう。
 */
type EffectArea = Readonly<
  | {
      kind: "targetting";
      targetting: Targetting;
      // TODO:
      //area
    }
  | {
      kind: "userPositionRelative";
      area: UserPositionRelativeEffectArea;
    }
  | {
      kind: "userSideRelative";
      area: UserSideRelativeEffectArea;
    }
>;

// TODO: 移動・能動攻撃・通常攻撃・バフデバフ・範囲攻撃数種類
type Effect = {};

type Impact = Readonly<{
  area: EffectArea;
  effect: Effect;
}>;

type Action = Readonly<{
  impacts: Array<Impact>;
  targetting: Targetting;
}>;

export type Skill = Readonly<
  {
    action?: Action;
    /**
     * 習得種別
     *
     * "active"でもパッシブ的な効果が付与されていることもあるなど両者は厳密に区別されないが、習得時のランダム選択時に比率を一定に保つなどで使う。
     */
    acquisitionKind: "active" | "passive";
    id: string;
  } & ParameterModification
>;

export type SkillPack = Readonly<Array<Skill>>;
