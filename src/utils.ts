import { parseRawLog } from "@cosmjs/stargate/build/logs";
import { hexDataSlice, stripZeros } from "@ethersproject/bytes";

export function inputToFunctionSighash(input: string): string {
    return hexDataSlice(input, 0, 4);
}

export function isZero(input: string): boolean {
    return stripZeros(input).length === 0;
}
export function isSuccess(rawLog: string, index: number): boolean {
    try {
      const log = parseRawLog(rawLog).find((l) => l.msg_index === index);
      const txLog = log?.events.find((evt) => evt.type === 'ethereumTx');
      const failLog = txLog?.attributes.find((attr) => attr.key === 'ethereumTxFailed');
      return failLog === undefined;
    } catch (e) {
      return false;
    }
  }