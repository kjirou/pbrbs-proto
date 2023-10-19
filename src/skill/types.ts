import { ParameterModification } from "../parameterModification";

type RelativeSide = "ally" | "enemy";

type TargettableArea =
  | "allOnAllySide"
  | "allOnEnemySide"
  | "around"
  | "crossShaped"
  | "frontEnemyLane"
  | "frontThreeEnemyLanes";

type Targetting = Readonly<
  | {
      targetKind: "cell" | "object";
      targettableArea: TargettableArea;
      // TODO: enemy側が選択するときや、こちらで自動決定する時の設定
    }
  | {
      /**
       * 自分自身を EffectArea 計算の始点にするという振る舞いは、"none" も "own~" も同じになる。
       * 対象選択が不要になるという点において、"cell" や "object" との違いがある。
       * 自分自身やそのセルを対象にする時、厳密には targettableArea から一つを選んでいることになるが、そちらの構造に合わせるより選択が不要になるという構造に合わせた方がたぶん良さそう。
       *
       */
      targetKind: "none" | "ownCell" | "ownObject";
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
