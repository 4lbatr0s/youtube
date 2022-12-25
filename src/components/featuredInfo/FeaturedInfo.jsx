import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../redux/requestMethods";

export default function FeaturedInfo() {

  const [income, setIncome] = useState([]);
  const [percentage, setPercentage] = useState(0);
  useEffect(()=> {
    const getIncome = async() =>{
      try {
        const res = await userRequest.get("orders/income");
        setIncome(res.data);
        setPercentage((res.data[1].total*100)/(res.data[0].total-100)) //INFO: How to calculate percentage comparing to the previous revenue
      } catch (error) {
        console.log(error);
        
      }
    }

    getIncome();

    console.log(income);
    console.log(percentage);
  },[])

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total || 2134}</span>
          <span className="featuredMoneyRate">
            -11.4 <ArrowDownward  className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            %{percentage || -1.4}{" "}
            {percentage <0 ? (
             <ArrowDownward className="featuredIcon negative"/>
            ) : 
            (
              <ArrowUpward className="featuredIcon positive"/>
            )
          }
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
