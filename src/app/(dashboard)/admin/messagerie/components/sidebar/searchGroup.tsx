import { SearchGroupDB } from "@/app/actions/users/groupe";
import { Divider, Input } from "@nextui-org/react";
import { ListFilter, MoreHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { NoGroup } from "./NoGroup";
import { AddGroup } from "./plus";

interface SearchGroupProps {
  groups: Group[];
  setGroups: (groups: Group[]) => void;
}

export const SearchGroup = ({ groups, setGroups }: SearchGroupProps) => {
  const { data: session } = useSession();

  useEffect(() => {
    const user_id = session?.user?.id ? session.user.id : "";
    const fetchGroups = async () => {
      const userGroupsDB = await SearchGroupDB(user_id);
      setGroups(userGroupsDB);
    };

    if (user_id) {
      fetchGroups();
    }
  }, [setGroups, session]);

  return (
    <div>
      {groups.length > 0 ? (
        <div>
          <div className="flex items-center justify-between gap-2 m-5">
            <AddGroup groups={groups} setGroups={setGroups} />
            <Input
              size="sm"
              variant="underlined"
              label="Rechercher un groupe"
            />
            <div className=" cursor-pointer hover:text-primary transition-colors">
              <ListFilter />
            </div>
          </div>
          <Divider />
          <div className="flex flex-col">
            {groups.map((group) => (
              <>
                <div
                  key={group.id}
                  className="p-5 border-l-2 border-primary flex items-center justify-between cursor-pointer hover:bg-black/25 transition-colors"
                >
                  <p>{group.name}</p>
                  <div>
                    <MoreHorizontal />
                  </div>
                </div>
                <Divider />
              </>
            ))}
          </div>
        </div>
      ) : (
        <NoGroup setGroups={setGroups} groups={groups} />
      )}
    </div>
  );
};
