// import { useState } from "react";
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
// import { Divider } from "../../../../components/divider";
// import { Input } from "../../../../components/input";
// import { Modal } from "../../../../components/modal";

const badgeText: Record<BadgeProps["badgeColor"], string> = {
  primary: "Ödenecek",
  success: "Ödendi",
  error: "Kapandı",
};

const ProgressPayment = () => {
  type DataType = {
    id: number;
    businessName: string;
    transactionDate: string;
    valueDate: string;
    iban: string;
    grossAmount: string;
    netAmount: string;
    badge: BadgeProps["badgeColor"];
  };
  // const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const columns: TableColumn<DataType>[] = [
    {
      name: "Sıra",
      selector: (row) => row.id,
      grow: 1,
    },
    {
      name: "İş Yeri Adı",
      selector: (row) => row.businessName,
      grow: 3,
    },
    {
      name: "İşlem Tarihi",
      selector: (row) => row.transactionDate,
      grow: 2,
    },
    {
      name: "Valör Tarihi",
      selector: (row) => row.valueDate,
      grow: 2,
    },
    {
      name: "IBAN",
      cell: (row) => <span>{row.iban}</span>,
      grow: 3,
    },
    {
      name: "Brüt Tutar",
      selector: (row) => row.grossAmount,
      grow: 2,
      style: { color: "#18181C", fontWeight: "600" },
    },
    {
      name: "Net Tutar",
      selector: (row) => row.netAmount,
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
            // onClick={() => setModalIsOpen(true)}
            isLink={true}
            className="hover:no-underline !font-semibold"
          >
            <IconEyeComplete
              width={24}
              height={24}
              viewBox="0 0 24 24"
              className="text-primary"
            />
            İşlemleri Gör
          </Button>
        </div>
      ),
      grow: 5,
    },
  ];

  const data: DataType[] = [
    {
      id: 1,
      businessName: "Raven Soft",
      transactionDate: "29.06.2024",
      valueDate: "29.06.2024",
      iban: "TR90 0087 7896 6789 6363 0678 54",
      grossAmount: "₺50.000.00",
      netAmount: "₺50.000.00",
      badge: "primary",
    },
    {
      id: 2,
      businessName: "Raven Soft",
      transactionDate: "29.06.2024",
      valueDate: "29.06.2024",
      iban: "TR90 0087 7896 6789 6363 0678 54",
      grossAmount: "₺50.000.00",
      netAmount: "₺50.000.00",
      badge: "success",
    },
    {
      id: 3,
      businessName: "Raven Soft",
      transactionDate: "29.06.2024",
      valueDate: "29.06.2024",
      iban: "TR90 0087 7896 6789 6363 0678 54",
      grossAmount: "₺50.000.00",
      netAmount: "₺50.000.00",
      badge: "success",
    },
    {
      id: 4,
      businessName: "Raven Soft",
      transactionDate: "29.06.2024",
      valueDate: "29.06.2024",
      iban: "TR90 0087 7896 6789 6363 0678 54",
      grossAmount: "₺50.000.00",
      netAmount: "₺50.000.00",
      badge: "primary",
    },
  ];

  return (
    <>
      <div className="w-full flex items-center gap-6 text-sm text-base-content-40 py-4">
        <p>Trpos</p>
        <IconArrowRight width={20} height={20} viewBox="0 0 20 20" />
        <p>Raporlar</p>
        <IconArrowRight width={20} height={20} viewBox="0 0 20 20" />
        <p className="text-primary">Hakedişler</p>
      </div>
      <div className="outlet w-full h-full pb-8">
        <div className="w-full h-full bg-actual-white rounded-2.5xl p-6">
          <div className="w-full h-full flex flex-col">
            <div className="w-full flex justify-between items-center">
              <div>
                <h1 className="text-[18px] text-base-content font-rubik font-medium">
                  Hakedişler
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
      {/* <Modal
        state={modalIsOpen}
        title="İşlem Detayları"
        onCloseModal={() => setModalIsOpen(false)}
        subTitle="Lütfen formu doldurunuz."
      >
        <Divider text="Web Site Bilgileri" />
        <div className="p-1">
          <Input label="Web Site URL Adresi" />
        </div>

        <Divider text="İşlem Bilgileri" />
        <div className="grid grid-cols-2 gap-4 p-1">
          <Input label="İşlem No" />
          <Input label="Sipariş No" />
          <Input label="İşlem Tarihi" />
          <Input label="Valör Tarihi" />
          <div className="col-span-2 grid grid-cols-3 gap-4">
            <Input label="Brüt Tutar" value="60.078,90" />
            <Input
              label="Brüt Tutar"
              value="40,00"
              inputClassName="!text-primary"
            />
            <Input
              label="Brüt Tutar"
              value="60.078,90"
              inputClassName="!text-error"
            />
          </div>
        </div>

        <Divider text="Durum Bilgileri" />
        <div className="p-1 grid grid-cols-2 gap-4">
          <Input label="Satış Tipi" />
          <Input label="İşlem Tipi" />
        </div>

        <Divider text="Hakediş Bilgileri" />
        <div className="p-1 grid grid-cols-2 gap-4">
          <Input label="Hakediş Tutarı" />
          <Input
            label="Hakediş Ödeme Durumu"
            value="Yapıldı"
            inputClassName="!text-blue"
          />
        </div>

        <Divider text="Müşteri Bilgileri" />
        <div className="p-1 grid grid-cols-2 gap-4">
          <Input label="Kart Numarası" />
          <Input label="IP Numarası" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Button
            variant="error"
            shape="full"
            size="medium"
            className="mt-6 !text-base !font-medium hover:!text-actual-white"
            isOutline={true}
          >
            İptal Et
          </Button>
          <Button
            variant="secondary"
            shape="full"
            size="medium"
            className="mt-6 !text-base !font-medium"
            isOutline={true}
          >
            İade Yap
          </Button>
          <Button
            variant="primary"
            shape="full"
            size="medium"
            className="mt-6 !text-base !font-medium"
          >
            Dekont Al
          </Button>
        </div>
      </Modal> */}
    </>
  );
};

export default ProgressPayment;
