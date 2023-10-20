import { ParameterModification } from "../parameterModification";

type RelativeSide = "ally" | "enemy";

type TargettableArea =
  | "allOnAllySide"
  | "allOnEnemySide"
  | "around"
  | "crossShaped"
  | "frontEnemyLane"
  | "frontThreeEnemyLanes"
  | "ownCell"
  | "ownObject";

/**
 * 対象選択
 *
 * 対象選択を要するときのフロー(targetKindが"cell"または"object かつ targettableAreaが"ownCell"または"ownObject"ではない):
 * - ユーザーがスキルをタップ
 * - "cell"なら候補のセルが強調表示、"object"なら候補のオブジェクトが強調表示
 * - 強調表示されている箇所をユーザーがタップ
 * - セルまたはオブジェクトの対象選択情報が格納され、効果範囲の処理に移る
 *
 * 対象選択を要しないときのフロー(targetKindが"none"):
 * - ユーザーがスキルをタップ
 * - 暗黙的に自身のセルを対象選択情報として格納し、効果範囲の処理に移る
 *   - この対象選択情報は効果範囲処理時に使わないこともある
 * - 対象選択情報が不要な効果範囲の処理に移る
 *
 * 対象選択が自身であるため省略するときのフロー(targetKindが"cell"または"object かつ targettableAreaが"ownCell"または"ownObject"である):
 * - ユーザーがスキルをタップ
 * - "ownCell"または"ownObject"の設定によりセルまたはオブジェクトの対象選択情報が格納され、効果範囲の処理に移る
 *
 * TODO: 効果範囲が事前にわからない。タップ数を増やすのはNGなので、効果範囲決定時もタップを要する別操作モードにすぐ切り替えられるようにするのが良さそう。
 */
type Targetting = Readonly<
  | {
      targetKind: "cell" | "object";
      targettableArea: TargettableArea;
      // TODO: enemy側が選択するときや、こちらで自動決定する時の設定
    }
  | {
      targetKind: "none";
    }
>;

type EffectArea =
  | "allOnAllySide"
  | "allOnEnemySide"
  | "around"
  | "crossShaped"
  | "frontEnemyLane"
  | "frontTwoEnemyLanes"
  | "frontThreeEnemyLanes"
  | "self";

type Effect = {};

type Impact = Readonly<{}>;

type Action = Readonly<{}>;

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
