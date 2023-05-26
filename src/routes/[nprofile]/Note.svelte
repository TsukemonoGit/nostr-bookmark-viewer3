<script lang=ts>
export let tag:string[]=[];
if(tag.length>0){
    
    const eventId= tag[1];


}
</script>

{#if tag.length>0}
<div class="card p-4 drop-shadow">
    eventID:{tag[1]}
</div>
{/if}
<style>
.card{
    margin-top: 5px;
}
</style>