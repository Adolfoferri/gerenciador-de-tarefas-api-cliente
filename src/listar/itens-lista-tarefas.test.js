import React from 'react';
import ReactDOM from 'react-dom';
import ItensListaTarefas from './itens-lista-tarefas';
import Tarefas from '../models/tarefa.model';
import {render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Tarefa from '../models/tarefa.model';


describe('Teste do componente que exibe um item da listagem de tarefas', () =>{

    const nomeTarefa = 'tarefa';
    const tarefa = new Tarefa(1, nomeTarefa, false);
    const tarefaConcluida = new Tarefa(2, nomeTarefa, true);

    it('deve renderizar o componente sem erros', () =>{
        const div = document.createElement('div');
        ReactDOM.render(
            <ItensListaTarefas
            tarefas = {[]}
            recarregarTarefas={() => false} />,div);
        ReactDOM.unmountComponentAtNode(div);
        
    });

    it('deve exibir a tarefa', () =>{
        const {getByTestId} = render(
            <table>
                <tbody>
                    <ItensListaTarefas
                    tarefas={[tarefa]}
                    recarrefarTarefa={() => false} />
                </tbody>
            </table>
        );
        expect(getByTestId('tarefa')).toHaveTextContent(nomeTarefa);
    });

    it('deve exibir uma tarefa concluida', () =>{
        const {getByTestId} = render(
            <table>
                <tbody>
                    <ItensListaTarefas
                    tarefas={[tarefaConcluida]}
                    recarrefarTarefa={() => false} />
                </tbody>
            </table>
        );
            expect(getByTestId('nome-tarefa')).toHaveStyle('text-decoration: line-through');
    });
});