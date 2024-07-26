import InfoCard from "../InfoCard";
import { t } from "@/i18n";

type DictKeys =
  | "characteristics"
  | "scientific_name"
  | "common_names"
  | "family"
  | "size"
  | "lifespan"
  | "centimeters_short"
  | "years";
type TraitsBlockDictionary = Record<DictKeys, string>;

interface Props {
  dict: TraitsBlockDictionary;
  scientificName: string;
  aliases: string[];
  family: string;
  size: string;
  lifespan: string;
}
const TraitsBlock = ({
  dict,
  scientificName,
  aliases,
  family,
  size,
  lifespan,
}: Props) => (
  <InfoCard.Container title={t(dict.characteristics)}>
    <InfoCard.Item term={t(dict.scientific_name)} def={scientificName} />
    <InfoCard.Item term={t(dict.common_names)} def={aliases.join(", ")} />
    <InfoCard.Item term={t(dict.family)} def={family} />
    <InfoCard.Item
      term={t(dict.size)}
      def={`${size} ${t(dict.centimeters_short)}`}
    />
    <InfoCard.Item
      term={t(dict.lifespan)}
      def={`${lifespan} ${t(dict.years)}`}
    />
  </InfoCard.Container>
);

export default TraitsBlock;
