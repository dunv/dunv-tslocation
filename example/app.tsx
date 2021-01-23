import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { useStringParam } from '../src';
import { useAssignParams, useNumberParam } from '../src/hooks';

const Test: React.FC = () => {
    const test = useStringParam('test');
    const testNumber = useNumberParam('testNumber');
    const assignParams = useAssignParams();

    const setTest = (newTest: string) => {
        assignParams({ add: { test: newTest } });
    };

    const clearTest = () => {
        assignParams({ remove: ['test'] });
    };

    const setTestNumber = (newTestNumber: number) => {
        assignParams({ add: { testNumber: newTestNumber.toString() } });
    };

    const clearTestNumber = () => {
        assignParams({ remove: ['testNumber'] });
    };

    return (
        <div>
            <div>
                test: {typeof test}, {test}
            </div>
            <button onClick={() => setTest(Math.random().toString(36).substring(7))}>setTest</button>
            <button onClick={() => clearTest()}>clearTest</button>
            <br />
            <br />
            <div>
                testNumber: {typeof testNumber}, {testNumber}
            </div>
            <button onClick={() => setTestNumber(Math.random())}>setTestNumber</button>
            <button onClick={() => clearTestNumber()}>clearTestNumber</button>
        </div>
    );
};

const rootDiv = document.createElement('div');
rootDiv.id = 'root';
document.body.appendChild(rootDiv);

ReactDOM.render(
    <BrowserRouter>
        <Test />
    </BrowserRouter>,
    document.getElementById('root')
);
