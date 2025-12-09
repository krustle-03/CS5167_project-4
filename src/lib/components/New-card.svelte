<script>
    let {cardType = 0} = $props();
</script>

<div class="container" style="height: 100%;">
    <div class="card h-100">
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">Create new {cardType ? "goal" : "streak"}</h5>
            <div class="flex-grow-1 d-flex align-items-center justify-content-center">
                <button class="btn btn-primary d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                    <i class="bi bi-plus-circle" style="font-size: 3rem;"></i>
                </button>
            </div>
        </div>
    </div>
</div>