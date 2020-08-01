import React from 'react';
import ReactDOM from 'react-dom';
import AtualizarTarefa from './atualizar-tarefa';
import Tarefa from '../models/tarefa.model';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

describe('Teste de componente de atualização de tarefas', () =>{

    const tarefaid = 1;



    it('deve exibir a modal de sucesso ao atualizar um tarefa', async () => {
        axiosMock.get.mockResolvedValueOnce({data: {nome: 'Estudar React'}});
        const {findByTestId} = render(<AtualizarTarefa id={tarefaid}/>);
        fireEvent.click(await findByTestId('btn-atualizar'));
        const modal = await findByTestId('modal');
        expect(modal).toHaveTextContent('Sucesso');
    });

});