
class Ellen extends React.Component{
    constructor(){
        super();
        this.state={
            msg:"Hello React"
        }
    }
    render(){
        return (<div>
            <h1>{this.state.msg}</h1>
            <input type="text" placeholder={this.state.msg} />
        </div>)
    }
}
ReactDOM.render(<Ellen/>,app)