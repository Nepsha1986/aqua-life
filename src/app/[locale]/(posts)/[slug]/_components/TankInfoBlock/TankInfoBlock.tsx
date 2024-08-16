import InfoCard from "../InfoCard";
import { Locale, t } from "@/i18n";
import { getDictionary } from "@/i18n/server/getDictionary";
import dictionary from "@/i18n/dictionaries/tank_info/en.json";

interface Props {
  locale: Locale;
  temperature: string;
  volume: string;
  gh: string;
  ph: string;
}

const TankInfoBlock = async ({
  locale,
  temperature,
  volume,
  gh,
  ph,
}: Props) => {
  const dict = await getDictionary<typeof dictionary>(locale, "tank_info");
  return (
    <InfoCard.Container title={t(dict.tank_info)}>
      <InfoCard.Item
        term={t(dict.temperature)}
        def={`${temperature} ${String.fromCharCode(8451)}`}
      />
      <InfoCard.Item
        term={t(dict.min_tank_size)}
        def={`${volume} ${t(dict.litters)}`}
      />
      <InfoCard.Item term={t(dict.water_hardness)} def={`${gh} gh`} />
      <InfoCard.Item term={t(dict.water_acidity)} def={`${ph} ph`} />
    </InfoCard.Container>
  );
};

export default TankInfoBlock;
