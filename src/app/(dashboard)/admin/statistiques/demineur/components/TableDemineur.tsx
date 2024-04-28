"use client";

import {
  Button,
  Checkbox,
  Chip,
  ChipProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Selection,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import { ChevronDownIcon, SearchIcon, Undo2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { deleteGame, getGame } from "../actions/Game";
import { columns, statusOptions } from "../data/data";
import { capitalize } from "../utils/utils";
import { VerticalDotsIcon } from "./verticalDot";

const statusColorMap: Record<string, ChipProps["color"]> = {
  Gagné: "success",
  Perdu: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "date",
  "time",
  "nb_cout",
  "win",
  "actions",
];

type Game = {
  id: string;
  name: string;
  date: string;
  time: string;
  nb_cout: string;
  win: string;
  avatar: string;
  email: string;
};

export default function App() {
  useEffect(() => {
    const getGameFunction = async () => {
      try {
        const response = await getGame();
        setGame(response);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    getGameFunction();
  }, []);

  const [game, setGame] = useState<Game[]>([]);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(game.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...game];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((game) =>
        game.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((game) =>
        Array.from(statusFilter).includes(game.win)
      );
    }

    return filteredUsers;
  }, [game, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Game, b: Game) => {
      const first = parseInt(a[sortDescriptor.column as keyof Game], 10);
      const second = parseInt(b[sortDescriptor.column as keyof Game], 10);
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const deleteGameFunction = async (id: string) => {
    try {
      await deleteGame(id);
      setGame((prev) => prev.filter((game) => game.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de la game :", error);
    }
  };

  const renderCell = React.useCallback((game: Game, columnKey: React.Key) => {
    const cellValue = game[columnKey as keyof Game];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "full", size: "sm", src: game.avatar }}
            classNames={{
              description: "text-default-500",
            }}
            description={game.email}
            name={cellValue}
          >
            {game.email}
          </User>
        );
      case "date":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "win":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[game.win]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Revisionner</DropdownItem>
                <DropdownItem
                  className="text-danger"
                  onClick={() => deleteGameFunction(game.id)}
                >
                  Supprimer
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const [isChecked, setIsChecked] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (isChecked) {
      const email = session?.user?.email;
      const filteredItems = game.filter((game) => game.email === email);
      setGame(filteredItems);
    } else {
      const getGameFunction = async () => {
        try {
          const response = await getGame();
          setGame(response);
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
        }
      };
      getGameFunction();
    }
  }, [isChecked, session, game]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex max-sm:flex-col justify-between gap-3 items-end">
          <div className="flex items-center gap-2 w-full">
            <Button
              variant="faded"
              color="primary"
              onClick={() => {
                window.history.back();
              }}
            >
              <span className="max-sm:hidden">Retour</span>
              <span className="sm:hidden">
                <Undo2 />
              </span>
            </Button>
            <Input
              isClearable
              classNames={{
                base: "w-full sm:max-w-[70%]",
                inputWrapper: "border-1",
              }}
              placeholder="Rechercher une game..."
              size="sm"
              startContent={<SearchIcon className="text-default-300" />}
              value={filterValue}
              variant="bordered"
              onClear={() => setFilterValue("")}
              onValueChange={onSearchChange}
            />
          </div>
          <div className="flex gap-3 min-w-60 justify-end">
            <Checkbox onValueChange={setIsChecked} size="sm">
              joué par moi
            </Checkbox>
            <Dropdown>
              <DropdownTrigger className="">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Colonnes
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Nombre total de games : {game.length}
          </span>
          <label className="flex items-center text-default-400 text-small">
            Ligne par page :
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
              defaultValue={rowsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    game.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <div className="absolute inset-0 p-3">
      {topContent}
      <Table
        isCompact
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper:
              "after:bg-foreground after:text-background text-background",
          },
        }}
        classNames={classNames}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
        className="absolute inset-0 top-28 max-sm:top-40 flex flex-col justify-between overflow-hidden overflow-y-scroll overflow-x-scroll"
      >
        <TableHeader columns={headerColumns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"Aucune game trouvée"}
          items={sortedItems}
          className="h-full"
        >
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey: any) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
