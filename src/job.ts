/**
 * 職業
 *
 * 有効なユニットであるかの一番の判断は、職業と能力値群との相性で決まる。
 * ただし厳密には、職業が持つスキルセットが特定の能力値に対して有効であるから職業の相性が良い、という枠組みにする。
 * スキルに関しては、選択の幅があったり、ランダム取得などもあるので、完全固定である職業と違って調整ができるからである。
 * これにより、推奨の能力値は低いけど他が高いユニットが別に活きる可能性を残せる。
 * 例えば、「戦士はSTRに対しての生命力の伸びが倍になる」というような調整はNG、「戦士はSTRに対して生命力の伸びが倍になるパッシブスキルを持つ」ならOK。
 */
export type Job = {
  attackPointsModification: number;
  defencePointsModification: number;
  magicalAttackPointsModification: number;
  magicalDefencePointsModification: number;
  id: "fighter";
};

export const jobs = [
  {
    id: "fighter",
    attackPointsModification: 1,
    defencePointsModification: 1,
    magicalAttackPointsModification: 0,
    magicalDefencePointsModification: 0,
  },
] as const satisfies Readonly<Array<Job>>;
