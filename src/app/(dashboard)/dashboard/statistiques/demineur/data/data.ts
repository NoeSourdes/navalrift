const columns = [
  { name: "ID", uid: "id", sortable: true },

  { name: "NOM", uid: "name", sortable: true },
  { name: "DATE", uid: "date", sortable: true },
  { name: "TEMPS", uid: "time", sortable: true },
  { name: "NOMBRE DE COÛTS", uid: "nb_cout", sortable: true },
  { name: "GAGNANT", uid: "win", sortable: true },
  { name: "ACTIONS", uid: "actions", sortable: false },
];

const statusOptions = [
  { name: "Gagné", uid: "active" },
  { name: "Perdu", uid: "vacation" },
];

export { columns, statusOptions };
