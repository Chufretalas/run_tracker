export namespace main {
	
	export class Run {
	    day: string;
	    distance: number;
	    time: number;
	    time_vo2: number;
	    avg_bpm: number;
	
	    static createFrom(source: any = {}) {
	        return new Run(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.day = source["day"];
	        this.distance = source["distance"];
	        this.time = source["time"];
	        this.time_vo2 = source["time_vo2"];
	        this.avg_bpm = source["avg_bpm"];
	    }
	}

}

