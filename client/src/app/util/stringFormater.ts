export class StringFormater {
    public static secondsToMinutes(time: number): string {
        const MAX_MINUTES: number = 60;
        const CARRY_FLAG: number = 10;
        const minutes: number = Math.floor((time) / MAX_MINUTES);
        const seconds: number = (time - (minutes * MAX_MINUTES));
        let minutesString: string = "00";
        let secondsString: string = "00";

        minutes < CARRY_FLAG ? minutesString = "0" + minutes : minutesString = minutes.toString();
        seconds < CARRY_FLAG ? secondsString = "0" + seconds : secondsString = seconds.toString();

        return minutesString + ":" + secondsString;
    }
}
