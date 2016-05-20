(function() {

    function showModal(modal) {
        var curtain = document.createElement('div');
        curtain.className = 'modal-curtain';
        curtain.addEventListener('click', function(e) {
            hideModal(modal);
            e.preventDefault();
        });
        document.body.appendChild(curtain);
        modal.style.display = 'block';
    }

    function hideModal(modal) {
        var curtain = document.getElementsByClassName('modal-curtain')[0];
        curtain.parentElement.removeChild(curtain);
        modal.style.display = 'none';
    }

    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('create-project-btn').addEventListener('click', function(e) {
            var modal = document.getElementById('create-project');
            showModal(modal);
            e.preventDefault();
        });
    });

})();