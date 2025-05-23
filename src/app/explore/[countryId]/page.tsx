import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { CountryData } from '@/components/type.chat';

export default async function CountryPage({
  params,
}: {
  params: Promise<{ countryId: string }>;
}) {
  const { countryId } = await params;

  const res = await fetch(
    `https://restcountries.com/v3.1/alpha/${countryId}`
  );
  if (!res.ok) return notFound();

  const [country] = await res.json();

  const {
    name,
    capital,
    region,
    subregion,
    population,
    languages,
    area,
    borders,
    currencies,
    timezones,
    flags,
    demonyms,
    maps,
    gini,
  } = country as CountryData;

  const languageList = Object.values(languages).join(', ');
  const currencyList = Object.values(currencies)
    .map((c) => `${c.name} (${c.symbol})`)
    .join(', ');
  const borderList =
    borders?.join(', ') || 'no neighboring countries';
  const giniValue = gini ? `${Object.values(gini)[0]}%` : 'N/A';

  return (
    <Card className=" border-none shadow-2xl my-6 p-1 md:p-6 space-y-4">
      <CardContent className="space-y-4 font-light">
        <h2 className="text-2xl font-bold">{name.common}</h2>
        <Image
          src={flags.png}
          alt={flags.alt || 'flag'}
          className=" rounded"
          width={100}
          height={100}
        />
        <p>
          <strong>{name.common}</strong>, officially known as{' '}
          <strong>{name.official}</strong>, is located in the region
          of <strong>{region}</strong>, specifically in{' '}
          <strong>{subregion}</strong>. Its capital city is{' '}
          <strong>{capital?.[0]}</strong>, and the country has a
          population of approximately{' '}
          <strong>{population?.toLocaleString()}</strong> people.
        </p>
        <p>
          The official language(s) include:{' '}
          <strong>{languageList}</strong>, and the national currency
          is <strong>{currencyList}</strong>. The total land area is{' '}
          <strong>{area?.toLocaleString()} km²</strong>.
        </p>
        <p>
          It shares borders with <strong>{borderList}</strong>. The
          country operates in the{' '}
          <strong>{timezones?.join(', ')}</strong> timezone.
        </p>
        <p>
          The demonym for its citizens is{' '}
          <strong>{demonyms.eng.m}</strong> (male) and{' '}
          <strong>{demonyms.eng.f}</strong> (female). Gini index
          (income inequality) is <strong>{giniValue}</strong>.
        </p>
        <p>
          You can view the country on{' '}
          <a
            href={maps?.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Google Maps
          </a>
          .
        </p>
      </CardContent>
    </Card>
  );
}
