function Alert(props) {
    console.log(props);
    return <div className="alert alert-warning" role="alert">
        {props.text}
    </div>;
}
export default Alert;