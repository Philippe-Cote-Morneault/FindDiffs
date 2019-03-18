export class TimerService {
    private static instance: TimerService;

    public static getInstance(): TimerService {
        if (!TimerService.instance) {
            TimerService.instance = new TimerService();
        }

        return TimerService.instance;
    }
    
    private constructor() {

    }
}