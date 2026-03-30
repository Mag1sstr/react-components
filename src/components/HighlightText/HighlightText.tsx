interface IProps {
  value: string;
  search: string;
}
function HighlightText({ value, search }: IProps) {
  const index = value.toLowerCase().indexOf(search.toLowerCase());
  return (
    <p>
      {value.slice(0, index)}
      <span className="bg-(--prime)/20">
        {value.slice(index, index + search.length)}
      </span>
      {value.slice(index + search.length, value.length)}
    </p>
  );
}

export default HighlightText;
