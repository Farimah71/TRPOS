import {
  IconClipboard,
  IconLink,
  IconUser,
  IconSetting,
  IconSupport,
  IconWebPage,
  IconBankCard,
} from "../components/icons/icons";
import { MyMenuItem } from "../types/menu-item.type";

export const menuItems1: {
  [key: string]: MyMenuItem[];
} = {
  "SANAL POS": [
    {
      title: "Web Site Yönetimi",
      href: "/dashboard/Institutional/webManagement",
      iconDeactive: <IconWebPage width={24} height={24} viewBox="0 0 24 24" />,
      iconActive: (
        <IconWebPage
          width={24}
          height={24}
          viewBox="0 0 24 24"
          className="text-black"
        />
      ),
    },
    {
      title: "Ödeme Linkleri",
      href: "/dashboard/Institutional/linkPayment",
      iconDeactive: <IconLink width={24} height={24} viewBox="0 0 24 24" />,
      iconActive: (
        <IconLink
          width={24}
          height={24}
          viewBox="0 0 24 24"
          className="text-black"
        />
      ),
    },
    {
      key: "report",
      title: "Raporlarım",
      href: "",
      iconDeactive: (
        <IconClipboard width={24} height={24} viewBox="0 0 24 24" />
      ),
      iconActive: (
        <IconClipboard
          width={24}
          height={24}
          viewBox="0 0 24 24"
          className="text-black"
        />
      ),
      isParent: true,
      children: [
        {
          key: "report-1",
          title: "İşlem Raporları",
          label: "İşlem Raporları",
          href: "/dashboard/Institutional/transactionReport",
        },
        {
          key: "report-2",

          title: "Hakedişler",
          href: "/dashboard/Institutional/progressPayment",
        },
        {
          key: "report-3",
          title: "Faturalar",
          href: "/dashboard/Institutional/bills",
        },
      ],
    },
    {
      title: "Kullanıcı Yetkilendirme",
      href: "/dashboard/Institutional/userAuthorization",
      iconDeactive: <IconUser width={24} height={24} viewBox="0 0 24 24" />,
      iconActive: (
        <IconUser
          width={24}
          height={24}
          viewBox="0 0 24 24"
          className="text-black"
        />
      ),
    },
  ],
  "FİZİKİ POS": [
    {
      title: "Fiziki POS",
      href: "/dashboard/Institutional/physicalPOS",
      iconDeactive: <IconBankCard width={24} height={24} viewBox="0 0 24 24" />,
      iconActive: (
        <IconBankCard
          width={24}
          height={24}
          viewBox="0 0 24 24"
          className="text-black"
        />
      ),
    },
  ],
  "Daha Fazlası": [
    {
      title: "Yardım ve Destek",
      href: "/dashboard/helpAndSupport",
      iconDeactive: <IconSupport width={24} height={24} viewBox="0 0 24 24" />,
      iconActive: (
        <IconSupport
          width={24}
          height={24}
          viewBox="0 0 24 24"
          className="text-black"
        />
      ),
    },
    {
      title: "Ayarlar",
      href: "/dashboard/settings",
      iconDeactive: <IconSetting width={24} height={24} viewBox="0 0 24 24" />,
      iconActive: (
        <IconSetting
          width={24}
          height={24}
          viewBox="0 0 24 24"
          className="text-black"
        />
      ),
    },
  ],
};

export const menuItems2: {
  [key: string]: MyMenuItem[];
} = {
  İŞLEMLER: [
    {
      title: "Ödeme Linkleri",
      href: "/dashboard/personal/linkPayment",
      iconDeactive: <IconLink width={24} height={24} viewBox="0 0 24 24" />,
      iconActive: (
        <IconLink
          width={24}
          height={24}
          viewBox="0 0 24 24"
          className="text-black"
        />
      ),
    },
    {
      title: "Raporlarım",
      href: "",
      iconDeactive: (
        <IconClipboard width={24} height={24} viewBox="0 0 24 24" />
      ),
      iconActive: (
        <IconClipboard
          width={24}
          height={24}
          viewBox="0 0 24 24"
          className="text-black"
        />
      ),
    },
  ],
  "Daha Fazlası": [
    {
      title: "Yardım ve Destek",
      href: "/dashboard/helpAndSupport",
      iconDeactive: <IconSupport width={24} height={24} viewBox="0 0 24 24" />,
      iconActive: (
        <IconSupport
          width={24}
          height={24}
          viewBox="0 0 24 24"
          className="text-black"
        />
      ),
    },
    {
      title: "Ayarlar",
      href: "/dashboard/settings",
      iconDeactive: <IconSetting width={24} height={24} viewBox="0 0 24 24" />,
      iconActive: (
        <IconSetting
          width={24}
          height={24}
          viewBox="0 0 24 24"
          className="text-black"
        />
      ),
    },
  ],
};

export const menuItems3: {
  [key: string]: MyMenuItem[];
} = {
  "Daha Fazlası": [
    {
      title: "Yardım ve Destek",
      href: "/dashboard/helpAndSupport",
      iconDeactive: <IconSupport width={24} height={24} viewBox="0 0 24 24" />,
      iconActive: (
        <IconSupport
          width={24}
          height={24}
          viewBox="0 0 24 24"
          className="text-black"
        />
      ),
    },
    {
      title: "Ayarlar",
      href: "/dashboard/settings",
      iconDeactive: <IconSetting width={24} height={24} viewBox="0 0 24 24" />,
      iconActive: (
        <IconSetting
          width={24}
          height={24}
          viewBox="0 0 24 24"
          className="text-black"
        />
      ),
    },
  ],
};
