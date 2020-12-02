import React from 'react'
import './index.less'
const NotFound = () => {
   
    return (
        <div className="loading">
            NotFound 404
        </div>
    )
}

export default NotFound



// class NotFound extends React.Component {
//     state= {
//         status:true
//     }

//     // componentDidMount(){
//     //     setTimeout(()=>{
//     //         this.setState({
//     //             status:false
//     //         })
//     //     },1000)
//     // }

//     render(){
//         if(this.state.status){
//             return (
//                 <div className="loading">
//                     <Spin  tip="Loading..." />
//                 </div>
//             )
//         }
//         return (
//             <div className="loading">
//                 NotFound 404
//             </div>
//         )
//     }
// }