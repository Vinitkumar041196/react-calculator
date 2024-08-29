function History(props){
    const histOps = props.opArr.map((op,i) => {
      return (
          <li key={String(i+1)}>{op}</li>
      );
    });
    return (
      <div>History:<br/>
        <ul className="opHist">
          {histOps}
        </ul>
      </div>
    );
}

export default History;