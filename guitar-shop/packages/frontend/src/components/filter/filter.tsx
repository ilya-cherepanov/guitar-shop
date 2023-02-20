interface FilterProps {
  legend: string,
  children: JSX.Element | JSX.Element[],
}


export default function Filter({legend, children}: FilterProps): JSX.Element {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">{legend}</legend>
      {children}
    </fieldset>
  );
}
