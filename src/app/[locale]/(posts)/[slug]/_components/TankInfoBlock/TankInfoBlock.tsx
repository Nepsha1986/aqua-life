import InfoCard from "../InfoCard";
import { t } from "@/i18n";

type DictKeys =
  | "tank_info"
  | "temperature"
  | "min_tank_size"
  | "water_hardness"
  | "water_acidity"
  | "litters";
type TankInfoBlockDictionary = Record<DictKeys, string>;

interface Props {
  dict: TankInfoBlockDictionary;
  temperature: string;
  volume: number;
  gh: string;
  ph: string;
}

const TankInfoBlock = ({ dict, temperature, volume, gh, ph }: Props) => {
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
