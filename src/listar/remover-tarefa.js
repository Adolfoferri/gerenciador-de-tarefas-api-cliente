import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt} from  '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function RemoverTarefas(props){

    const API_URL_REMOVER_TAREFA = 'http://localhost:3001/gerenciador-tarefas/';

    const [exibirModal, setExibirModal] = useState(false);
    const [exibirModalErro, setExibirModalErro] = useState(false);

    function handleAbrirModal(event){
        event.preventDefault();
        setExibirModal(true);
    }

    function handleFacharModal(){
        setExibirModal(false);
    }

    function hanldeFecharModalErro(){
        setExibirModalErro(false);
    }
    async function handleRemoverTarefa(event){
        event.preventDefault();
        try{

            await axios.delete(API_URL_REMOVER_TAREFA + props.tarefa.id);
            setExibirModal(false);
            props.recarregarTarefas(true);
        }catch(err){
            setExibirModal(false);
            setExibirModalErro(true);
        }

        
    }

    return(

        <span>
            <Button variant="danger" 
            className="btn-sm"
            onClick={handleAbrirModal}
            data-testid="btn-abrir-modal">
            <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
            <Modal show={exibirModal} onHide={handleFacharModal} data-testid="modal">
            <Modal.Header closeButton>
                <Modal.Title>Remover tarefa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Deseja realmente remover a seguinte tarefa?
                <br />
                <strong>{props.tarefa.nome}</strong>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" 
                        onClick={handleRemoverTarefa}
                        data-testid="btn-remover">
                            Sim
                        </Button>
                        <Button variant="light" 
                                onClick={handleFacharModal}>
                                    Não
                                </Button>
            </Modal.Footer>


            </Modal>
            <Modal show={exibirModalErro} onHide={hanldeFecharModalErro}>
                <Modal.Header closeButton>
                    <Modal.Title>Erro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Erro ao remover Tarefa,tente novamente em instantes.
                </Modal.Body>
                <Modal.Footer>
                    <Button
                    variant="warning" onClick={hanldeFecharModalErro}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

        </span>
    );

}

RemoverTarefas.propTypes = {
    tarefa: PropTypes.object.isRequired,
    recarregarTarefas: PropTypes.func.isRequired
}

export default RemoverTarefas;