import Description from "Components/Features/Description/Description";
import Graph from "Components/Features/Graph/Graph";

const CryptoInfo = () => {
   return (
       <section style={{display:"flex" , flexWrap:"wrap" , width:"100vw" , height:"100vh"}}>
        <Description/>
        <Graph/>
       </section>
   )
}

export default CryptoInfo ;