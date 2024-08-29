function Display(props){
    return (
      <div className="display">
        <p>{props.res}</p>
        <input pattern="[0-9]" ref={props.inref} type="number" placeholder="Type a number" />
      </div>
    );
}

export default Display;