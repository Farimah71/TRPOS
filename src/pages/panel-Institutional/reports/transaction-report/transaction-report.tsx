import { useState } from "react";
import { Badge } from "../../../../components/badge/badge";
import { BadgeProps } from "../../../../components/badge/badge.type";
import { Button } from "../../../../components/button";
import {
  IconArrowRight,
  IconEyeComplete,
  IconFilter,
  IconSearch,
} from "../../../../components/icons/icons";
import { TableColumn } from "react-data-table-component";
import { Table } from "../../../../components/table";
import { NumberSelectInput } from "../../../../components/number-select";
import { DetailModal } from "./modal/detail";
import { FilterModal } from "./modal/filter";
import { CancelModal } from "./modal/cancel";
import { RefundModal } from "./modal/refund";

const badgeText: Record<BadgeProps["badgeColor"], string> = {
  primary: "Onayladnı",
  success: "Aktif",
  error: "İade",
};

type ModalsType = "detail" | "filter" | "";
type ActionModalsType = "cancel" | "refund" | "";

const TransactionReport = () => {
  const [isModalOpen, setIsModalOpen] = useState<ModalsType>("");
  const [isActionModalOpen, setIsActionModalOpen] =
    useState<ActionModalsType>("");

  const closeModalHandler = () => {
    setIsModalOpen("");
  };
  const closeActionModalHandler = () => {
    setIsActionModalOpen("");
  };

  type DataType = {
    id: number;
    transactionName: string;
    webSite: string;
    transactionDate: string;
    salesType: string;
    transactionAmount: string;
    badge: BadgeProps["badgeColor"];
  };

  const columns: TableColumn<DataType>[] = [
    {
      name: "Sıra",
      selector: (row) => row.id,
      grow: 1,
    },
    {
      name: "İşlem Adı",
      selector: (row) => row.transactionName,
      grow: 5,
      style: { color: "black", fontWeight: "500" },
    },
    {
      name: "Web Site",
      selector: (row) => row.webSite,
      grow: 2,
    },
    {
      name: "İşlem Tarihi",
      selector: (row) => row.transactionDate,
      grow: 2,
    },
    {
      name: "Satış Tipi",
      selector: (row) => row.salesType,
      grow: 2,
    },
    {
      name: "İşlem Tutarı",
      selector: (row) => row.transactionAmount,
      grow: 2,
      style: { color: "#22B789", fontWeight: "600" },
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
          <Button
            onClick={() => setIsModalOpen("detail")}
            isLink={true}
            className="hover:no-underline !font-semibold"
          >
            <IconEyeComplete
              width={24}
              height={24}
              viewBox="0 0 24 24"
              className="text-primary"
            />
            Detaylar
          </Button>
        </div>
      ),
      grow: 5,
    },
  ];

  const data: DataType[] = [
    {
      id: 1,
      transactionName: "Party chicken lot pizza ranch wing.",
      webSite: "arçelik.com",
      transactionDate: "12.09.2024",
      salesType: "Peşin",
      transactionAmount: "₺50.000.00",
      badge: "primary",
    },
    {
      id: 2,
      transactionName: "Party chicken lot pizza ranch wing.",
      webSite: "arçelik.com",
      transactionDate: "12.09.2024",
      salesType: "Peşin",
      transactionAmount: "₺50.000.00",
      badge: "error",
    },
  ];

  return (
    <>
      <div className="w-full flex items-center gap-6 text-sm text-base-content-40 py-4">
        <p>Trpos</p>
        <IconArrowRight width={20} height={20} viewBox="0 0 20 20" />
        <p>Raporlar</p>
        <IconArrowRight width={20} height={20} viewBox="0 0 20 20" />
        <p className="text-primary">İşlem Raporları</p>
      </div>
      <div className="outlet w-full h-full pb-8">
        <div className="w-full h-full bg-actual-white rounded-2.5xl p-6">
          <div className="w-full h-full flex flex-col">
            <div className="w-full flex justify-between items-center">
              <div>
                <h1 className="text-[18px] text-base-content font-rubik font-medium">
                  İşlem Raporları
                </h1>
                <p className="subTitle_text text-xs text-base-content-40 mt-2">
                  Lorem, ipsum.
                </p>
              </div>
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
                  onClick={() => setIsModalOpen("filter")}
                  className="text-sm !rounded-2xl !pr-14 !border !border-[#e5e7eb]"
                  isInTop
                  isOutline={true}
                >
                  <IconFilter
                    width={20}
                    hanging={20}
                    viewBox="0 0 20 20"
                    className="text-base-content"
                  />
                  Filtrele
                </Button>
              </div>
            </div>
            <div className="w-full flex-grow mt-6">
              <Table columns={columns} data={data} />
            </div>
          </div>
        </div>
      </div>
      <DetailModal
        state={isModalOpen === "detail"}
        onCloseModal={closeModalHandler}
        cancelModalHandler={() => {
          setIsModalOpen("");
          setIsActionModalOpen("cancel");
        }}
        refundModalHandler={() => {
          setIsModalOpen("");
          setIsActionModalOpen("refund");
        }}
      />
      <FilterModal
        state={isModalOpen === "filter"}
        onCloseModal={closeModalHandler}
      />
      <CancelModal
        state={isActionModalOpen == "cancel"}
        onCloseModal={closeActionModalHandler}
      />
      <RefundModal
        state={isActionModalOpen == "refund"}
        onCloseModal={closeActionModalHandler}
      />
    </>
  );
};

export default TransactionReport;
