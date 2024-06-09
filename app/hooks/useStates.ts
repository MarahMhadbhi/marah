import tunisiaStates from './tunisia-states.json';

interface State {
  value: string;
  label: string;
  latlng: number[];
  region: string;
}

const formattedStates: State[] = tunisiaStates.map((state: { value:any; label: any; latlng:any ; region: any; }) => ({
  value: state.value,
  label: state.label,
  latlng: state.latlng,
  region: state.region,
}));

const UseTunisiaStates = () => {
  const getAll = () => formattedStates;

  const getByValue = (value: string) => {
    return formattedStates.find((state) => state.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default UseTunisiaStates;


