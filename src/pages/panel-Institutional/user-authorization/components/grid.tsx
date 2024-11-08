import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../../../../components/button";
import { IconPen, IconPlus } from "../../../../components/icons/icons";
import { Table } from "../../../../components/table";
import { Badge } from "../../../../components/badge";
import { BadgeProps } from "../../../../components/badge/badge.type";
import { TableColumn } from "react-data-table-component/dist/DataTable/types";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { getMerchantRole } from "../../../../redux/actions/settings/Merchant-role";

type ModalTypes = "create" | "edit" | "delete" | "";
type DataType = {
  no: number;
  roleId: number;
  userCustomerId: number;
  name: string;
  surName: string;
  phoneNumber: string;
  email: string;
  badge: BadgeProps["badgeColor"];
};
type Props = {
  data: [];
  setIsModalOpen: Dispatch<SetStateAction<{ type: ModalTypes; data?: {} }>>;
};
export const UserAuthorizationGrid: React.FC<Props> = ({
  data,
  setIsModalOpen,
}) => {
  const [roles, setRoles] = useState<
    {
      customerType: number;
      id: string;
      name: string;
      normalizedName: string;
      concurrencyStamp: string;
    }[]
  >();
  const [tableData, setTableData] = useState<{}[]>();

  const { info: MerchantRoleInfo } = useAppSelector(
    (state) => state.MerchantRoleSlice
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMerchantRole());
    if (data.length) {
      const renderingData = data.map((item: DataType, index) => ({
        no: index + 1,
        roleId: item.roleId,
        userCustomerId: item.userCustomerId,
        name: item.name,
        surName: item.surName,
        phoneNumber: item.phoneNumber,
        email: item.email,
        badge:
          roles?.length && roles[0].name.toLowerCase().includes("admin")
            ? "primary"
            : "success",
      }));
      setTableData(renderingData);
    }
  }, []);
  useEffect(() => {
    if (MerchantRoleInfo.length) {
      const existingRoles = data.map((row: { id: string }) => {
        return MerchantRoleInfo.filter(
          (role: { id: string }) =>
            role.id == "6d486b0f-2170-4342-8c74-2f1f4ef106c8"
        );
      });
      existingRoles.length && setRoles(existingRoles[0]);
    }
  }, [MerchantRoleInfo]);

  const columns: TableColumn<DataType>[] = [
    {
      name: "Sıra",
      selector: (row) => row.no,
      grow: 1,
    },
    {
      name: "Personel Adı",
      selector: (row) => row.name + " " + row.surName,
      grow: 3,
      style: { color: "black", fontWeight: "500" },
    },
    {
      name: "Telefon Numarası",
      selector: (row) => "+" + row.phoneNumber,
      grow: 2,
    },
    {
      name: "Mail Adresi",
      selector: (row) => row.email,
      grow: 3,
    },
    {
      name: "Görev",
      cell: (row) => (
        <Badge badgeColor={row.badge} text={badgeText[row.badge]} />
      ),
      grow: 3,
    },
    {
      name: "",
      cell: (row) => (
        <div className="flex flex-col gap-1 2xl:flex-row 2xl:gap-0 items-center">
          <Button
            isLink={true}
            className="hover:no-underline !text-orange"
            onClick={() =>
              setIsModalOpen({
                type: "delete",
                data: {
                  UserCustomerId: row.userCustomerId,
                  RoleId: row.roleId,
                },
              })
            }
          >
            <IconPen
              width={24}
              height={24}
              viewBox="0 0 24 24"
              className="text-orange"
            />
            Düzenle
          </Button>
        </div>
      ),
      grow: 5,
    },
  ];

  const badgeText: Record<BadgeProps["badgeColor"], string> = {
    primary: "Admin",
    success: "Operasyon",
    error: "",
  };

  return (
    <div className="outlet w-full h-full pt-4">
      <div className="w-full bg-actual-white rounded-2.5xl p-6 pb-0">
        <div>
          <div className="w-full flex justify-between items-center">
            <div>
              <h1 className="text-[20px] text-base-content font-semibold">
                Kullanıcılar
              </h1>
              <p className="subTitle_text text-xs text-base-content-40 mt-2">
                Lorem, ipsum.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Button
                variant="primary"
                className="text-sm !rounded-2xl"
                onClick={() => setIsModalOpen({ type: "create" })}
                isInTop
              >
                <IconPlus width={24} hanging={24} viewBox="0 0 24 24" />
                Yeni Kullanıcı Ekle
              </Button>
            </div>
          </div>
          <div className="w-full mt-6">
            <Table columns={columns} data={tableData} />
          </div>
        </div>
      </div>
    </div>
  );
};
