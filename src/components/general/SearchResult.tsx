import { useContext } from "react";
import Card from "./Card";
import Context from '../../context/AppContext'


const SearchResult = () => {

  const ctx = useContext(Context);

  return (
    <div>
      <div>
        {ctx.barbers.map((b) => (
          <Card
            key={b.id}
            person={b}
            routeTitle="show profile"
            routeTo={"/barber-profile/" + b.id}
          />
        ))}
      </div>
      <div>
        {ctx.customers.map((c) => (
          <Card
            key={c.id}
            person={c}
            routeTitle="show profile"
            routeTo={"/customer-profile/" + c.id}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
