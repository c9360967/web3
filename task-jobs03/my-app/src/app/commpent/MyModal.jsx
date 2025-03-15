import { Modal } from "antd";
import { useState } from "react";

export const MyModal = ({openStatus, child}) => {
    console.log("111111111111111111111")
    const [modalStatus, setModalStatus] = useState(true)
    // function open(){
    //     setModalStatus(true)
    // }
    function Ok(){
        setModalStatus(false)
    }
    function cancel(){
        setModalStatus(false)
    }
    return(
        <Modal title="错误" open={modalStatus} onOk={Ok} onCancel={cancel}>{child}</Modal>
    )
}