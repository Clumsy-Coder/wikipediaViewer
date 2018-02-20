const api = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&gsrlimit=10&generator=search&prop=extracts&exintro&explaintext&exsentences=1&gsrsearch=";
const page = 'https://en.wikipedia.org/?curid=';
$(document).ready(() => {
	$("#searchForm").submit((event) => {
		getData();
		event.preventDefault()
	})
});

function getData() {
	$("#resultList").html("");
	$("#loader").removeClass("hide");
		let input = $("#searchInput").val();
		$.getJSON(api + input, (result) => {
			$("#loader").addClass("hide");
			$.each(result.query.pages, (i) => {
				$("#resultList").append(resultCard(result.query.pages[i].title, 
												   result.query.pages[i].extract, 
												   result.query.pages[i].pageid));
			});
		});
}

function resultCard(title, content, link) {
	return `<div class="card horizontal">
                <div class="card-stacked">
                    <div class="card-content">
                        <h3>${title}</h3>
                        <br />
                        <p>${content}</p>
                    </div>
                    <div class="card-action">
                        <a target="_blank" href=${page + link}>Go to wiki</a>
                    </div>
                </div>
            </div>`;
}