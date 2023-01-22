import { flatten } from "lodash";
import { all, fork } from "redux-saga/effects";

const forked = flatten(
	[].map(sagas => Object.keys(sagas).map(key => fork(sagas[key])))
);

export function* root() {
	yield all(forked);
}
