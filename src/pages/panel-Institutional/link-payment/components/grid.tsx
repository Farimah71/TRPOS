import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/button";
import {
  IconEyeComplete,
  IconPen,
  IconPlus,
  IconSearch,
} from "../../../../components/icons/icons";
import { NumberSelectInput } from "../../../../components/number-select";
import { Table } from "../../../../components/table";
import { Badge } from "../../../../components/badge";
import { BadgeProps } from "../../../../components/badge/badge.type";
import { TableColumn } from "react-data-table-component/dist/DataTable/types";

const badgeText: Record<BadgeProps["badgeColor"], string> = {
  primary: "Onay Bekliyor",
  success: "Aktif",
  error: "Kapandı",
};

type DataType = {
  id: number;
  product: string;
  webSite: string;
  installment: string;
  expiration: string;
  moq: string;
  badge: BadgeProps["badgeColor"];
};

type Props = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};
export const LinkPaymentGrid: React.FC<Props> = ({ setIsModalOpen }) => {
  const columns: TableColumn<DataType>[] = [
    {
      name: "Sıra",
      selector: (row) => row.id,
      grow: 1,
    },
    {
      name: "Ürün / Hizmet Adı",
      selector: (row) => row.product,
      grow: 4,
      style: { color: "black", fontWeight: "500" },
    },
    {
      name: "Web Site",
      selector: (row) => row.webSite,
      grow: 2,
    },
    {
      name: "Taksit",
      selector: (row) => row.installment,
      grow: 2,
    },
    {
      name: "Link Bitiş Tarihi",
      selector: (row) => row.expiration,
      grow: 2,
    },
    {
      name: "Ö. Adedi",
      selector: (row) => row.moq,
      grow: 2,
    },
    {
      name: "Durum",
      cell: (row) => (
        <Badge badgeColor={row.badge} text={badgeText[row.badge]} />
      ),
      grow: 4,
    },
    {
      name: "",
      cell: () => (
        <div className="flex flex-col gap-1 2xl:flex-row 2xl:gap-0 items-center">
          <Button isLink={true} className="hover:no-underline">
            <IconEyeComplete
              width={24}
              height={24}
              viewBox="0 0 24 24"
              className="text-primary"
            />
            <Link to="/dashboard/Institutional/linkDetail/1">Görüntüle</Link>
          </Button>
          <Button isLink={true} className="hover:no-underline !text-orange">
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

  const data: DataType[] = [
    {
      id: 1,
      product: "Arçelik Televizyon QHD",
      webSite: "arçelik.com",
      installment: "Peşin",
      expiration: "01.02.2024",
      moq: "10",
      badge: "primary",
    },
    {
      id: 2,
      product: "Arçelik Televizyon QHD",
      webSite: "arçelik.com",
      installment: "3 Taksit",
      expiration: "01.02.2024",
      moq: "16",
      badge: "success",
    },
    {
      id: 3,
      product: "Vestel Klima",
      webSite: "arçelik.com",
      installment: "6 Taksit",
      expiration: "16.06.2024",
      moq: "90",
      badge: "error",
    },
  ];
  return (
    <div className="outlet w-full h-full">
      <div className="w-full h-full bg-actual-white rounded-2.5xl p-6">
        <div className="w-full h-full flex flex-col">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-6">
              <Button
                isOutline={true}
                className="text-sm !rounded-2xl !border-[#e5e7eb] !text-base-content-20"
              >
                <IconSearch
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  className="text-base-content"
                />
                Ara...
              </Button>

              <NumberSelectInput
                placeholder="Se..."
                options={[
                  { value: 5, label: "5" },
                  { value: 6, label: "6" },
                  { value: 7, label: "7" },
                ]}
              />

              <Button
                variant="primary"
                className="text-sm !rounded-2xl"
                onClick={() => setIsModalOpen(true)}
                isInTop
              >
                <IconPlus width={24} hanging={24} viewBox="0 0 24 24" />
                Yeni Link Oluştur
              </Button>
            </div>
          </div>
          <div className="w-full flex-grow mt-6">
            <Table columns={columns} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};
