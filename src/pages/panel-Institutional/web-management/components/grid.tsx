import { TableColumn } from "react-data-table-component";
import { BadgeProps } from "../../../../components/badge/badge.type";
import { Badge } from "../../../../components/badge";
import { Button } from "../../../../components/button";
import {
  IconArrowRight,
  IconEyeComplete,
  IconPen,
  IconPlus,
} from "../../../../components/icons/icons";
import { Link } from "react-router-dom";
import { Table } from "../../../../components/table";
import { Dispatch, SetStateAction } from "react";

const badgeText: Record<BadgeProps["badgeColor"], string> = {
  primary: "Onay Bekliyor",
  success: "Aktif",
  error: "Kapandı",
};

type Props = {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
};

export const GridInstitutionalWebManagement: React.FC<Props> = ({
  setIsOpenModal,
}) => {
  type DataType = {
    id: number;
    site: string;
    url: string;
    installment: string;
    badge: BadgeProps["badgeColor"];
  };

  const columns: TableColumn<DataType>[] = [
    {
      name: "Sıra",
      selector: (row) => row.id,
      grow: 1,
    },
    {
      name: "Site / işletme / Mağaza Adı",
      selector: (row) => row.site,
      grow: 4,
      style: { color: "black", fontWeight: "500" },
    },
    {
      name: "URL",
      selector: (row) => row.url,
      grow: 2,
    },
    {
      name: "Taksit",
      selector: (row) => row.installment,
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
            <Link to="/dashboard/Institutional/siteDetail/1">Görüntüle</Link>
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
      site: "Raven Soft",
      url: "raven.com.tr",
      installment: "Peşin",
      badge: "primary",
    },
    {
      id: 2,
      site: "Trpos Ödeme Şirketi",
      url: "trpos.com",
      installment: "3 Taksit",
      badge: "success",
    },
    {
      id: 3,
      site: "Migros",
      url: "migros.com",
      installment: "6 Taksit",
      badge: "error",
    },
  ];
  return (
    <>
      <div className="container w-full flex items-center gap-6 text-sm text-base-content-40 p-4">
        <p>Trpos</p>
        <IconArrowRight width={20} height={20} viewBox="0 0 20 20" />
        <p>Web Site Yönetimi</p>
        <IconArrowRight width={20} height={20} viewBox="0 0 20 20" />
        <p className="text-primary">Liste</p>
      </div>
      <div className="outlet w-full h-full container p-4 pb-8">
        <div className="w-full h-full bg-actual-white rounded-2.5xl p-6">
          <div className="w-full h-full flex flex-col">
            <div className="w-full flex justify-between items-center">
              <div>
                <h1 className="text-[20px] text-base-content font-semibold">
                  Web Siteleriniz
                </h1>
                <p className="subTitle_text text-xs text-base-content-40 mt-2">
                  Lorem, ipsum.
                </p>
              </div>
              <div>
                <Button
                  onClick={() => setIsOpenModal(true)}
                  variant="primary"
                  className="text-sm !rounded-2xl"
                  isInTop
                >
                  <IconPlus width={24} hanging={24} viewBox="0 0 24 24" />
                  Yeni Site Ekle
                </Button>
              </div>
            </div>
            <Table data={data} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
};
