'use strict';

const React = require('react-native');
const { View } = React;

const utils = require('react-addons-test-utils');

jest.dontMock('../../view/MoviesView');
var MoviesView = require('../../view/MoviesView');

describe('MovieView', () => {
    let moviesView;

    const initialProps = {
        dataService: {fetchData: jest.genMockFn()}
    };

    function renderScreen(props, states) {
        const renderer = utils.createRenderer();
        renderer.render(<MoviesView {...props || {}}/>);
        const instance = renderer._instance._instance;
        instance.setState(states || {});
        const output = renderer.getRenderOutput();

        return {
            output,
            instance
        };
    }

    it('should fetch data on componentDidMount', () => {
        moviesView = renderScreen(initialProps);
        const {instance} = moviesView;
        instance.componentDidMount();
        expect(initialProps.dataService.fetchData.mock.calls.length).toBe(1);
        expect(initialProps.dataService.fetchData.mock.calls[0][0]).toBe(instance.onDataResponse);
    });

    it('should display the loading view if data was not loaded', () => {
        moviesView = renderScreen();
        const {output} = moviesView;
        expect(output.type).toEqual(View);
        expect(output.props.children.props.children).toBe("Loading movies...");
    });

    it('should display the list view if data was loaded', () => {
        const states = {loaded: true, dataSource: {test: "test"}};
        moviesView = renderScreen({}, states);
        const {output} = moviesView;
        expect(output.type.name).toBe("ListView");
        expect(output.props.dataSource).toEqual(states.dataSource);
    });

});