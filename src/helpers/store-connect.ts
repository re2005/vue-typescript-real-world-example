import Vue from 'vue';
import {createNamespacedHelpers, mapMutations as defaultMapMutation, mapState as defaultMapState} from 'vuex';

export function connectToStore(propNames: Array<string | object>, namespaceName: string) {
    const propList = Array.isArray(propNames) ? propNames : [propNames];
    const {mapMutations, mapState} = namespaceName
        ? createNamespacedHelpers(namespaceName)
        : {
            mapMutations: defaultMapMutation,
            mapState: defaultMapState
        };

    return propList.reduce((connectors, propConfig) => {
        const propName =
            typeof propConfig === 'object'
                ? Object.keys(propConfig)[0]
                : propConfig;

        return {
            // @ts-ignore
            ...connectors,
            [propName]: {
                get() {
                    return mapState({
                        [propName]: (state: any) => {
                            if (
                                state[propName] === undefined && propConfig[propName] !== undefined
                            ) {
                                this[propName] = propConfig[propName];
                            }
                            return state[propName];
                        }
                    })[propName].call(this);
                },
                set(newValue: any) {
                    mapMutations(['updateByKey'])['updateByKey'].call(this, {
                        key: propName,
                        value: newValue
                    });
                }
            }
        };
    }, {});
}

export function updateByKey(state: any, {key, value}: any) {
    if (!state.hasOwnProperty(key)) {
        Vue.set(state, key, value);
    } else {
        state[key] = value;
    }
}
