module.exports = {
	state:{
		url: "mongodb+srv://jace:jace@cluster0.53bkx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
		db: "covid_nszu",
		collection: "state"
	},
	db:{
		covid_nszu:{
			url: "mongodb+srv://jace:jace@cluster0.53bkx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
			name: "covid_nszu",
			collection: "covid_ua",
			dateColumn: "zvit_date",
			dateFormat:"YYYY-MM-DD",
			updater:"./updater.js",
			sourceUrl:"MMhttps://github.com/VasiaPiven/covid19_ua/blob/master/covid19_by_area_type_hosp_dynamics.zip?raw=true"
		},
		
		covid_owid:{
				url: "mongodb+srv://jace:jace@cluster0.53bkx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
				name: "covid_nszu",
				dateColumn:"date",
				dateFormat:"YYYY-MM-DD",
				collection: "covid_owid",
				updater:"./updater.js",
				sourceUrl:"https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv"
		},

		OxCGRT_indexes:{
			url:"mongodb+srv://jace:jace@cluster0.qdn15.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
			name:"OxCGRT",
			dateColumn:"Date",
			dateFormat:"YYYYMMDD",
			collection:"indexes",
			updater:"./updater.js",
			sourceUrl:"https://raw.githubusercontent.com/OxCGRT/covid-policy-tracker/master/data/OxCGRT_latest.csv"
		},

		OxCGRT_notes:{
			url:"mongodb+srv://jace:jace@cluster0.qdn15.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
			name:"OxCGRT",
			dateColumn:"Date",
			dateFormat:"YYYYMMDD",
			collection:"notes",
			updater:"./updater.js",
			sourceUrl:"https://raw.githubusercontent.com/OxCGRT/covid-policy-tracker/master/data/OxCGRT_latest_responses.csv"
		},

		sota: {
			url:"mongodb+srv://jace:jace@cluster0.qdn15.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
			name:"OxCGRT",
			dateColumn:"date",
			dateFormat:"YYYY-MM-DD",
			collection:"sota",
			updater:"./sota-updater.js"
		}

	}
}