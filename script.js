(() => {
  const PRICE = 12400;
  let qty = 5;
  let purchased = false;
  let timer = null;
  let seconds = 15;

  const qtyValue = document.getElementById('qtyValue');
  const summaryQty = document.getElementById('summaryQty');
  const summaryTotal = document.getElementById('summaryTotal');
  const minusBtn = document.getElementById('minusBtn');
  const plusBtn = document.getElementById('plusBtn');
  const buyBtn = document.getElementById('buyBtn');
  const confirmModal = document.getElementById('confirmModal');
  const countdown = document.getElementById('countdown');
  const cancelBtn = document.getElementById('cancelBtn');
  const processNowBtn = document.getElementById('processNowBtn');
  const shopView = document.getElementById('shopView');
  const successView = document.getElementById('successView');
  const ordersView = document.getElementById('ordersView');
  const orderCard = document.getElementById('orderCard');
  const noOrders = document.getElementById('noOrders');
  const viewOrdersBtn = document.getElementById('viewOrdersBtn');

  function updateCart(){
    qtyValue.textContent = qty;
    summaryQty.textContent = qty;
    summaryTotal.textContent = '$' + (PRICE*qty).toLocaleString('en-US') + ' MXN';
  }

  function show(view){
    shopView.hidden = view !== 'shop';
    successView.hidden = view !== 'success';
    ordersView.hidden = view !== 'orders';
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function stopTimer(){
    if(timer){clearInterval(timer);timer=null;}
  }

  function closeModal(){
    stopTimer();
    confirmModal.hidden = true;
  }

  function completePurchase(){
    closeModal();
    purchased = true;
    orderCard.hidden = false;
    noOrders.hidden = true;
    show('success');
  }

  function openModal(){
    seconds = 5;
    countdown.textContent = seconds;
    confirmModal.hidden = false;
    timer = setInterval(() => {
      seconds -= 1;
      countdown.textContent = seconds;
      if(seconds <= 0) completePurchase();
    },1000);
  }

  minusBtn.addEventListener('click',()=>{if(qty>1){qty--;updateCart();}});
  plusBtn.addEventListener('click',()=>{if(qty<9){qty++;updateCart();}});
  buyBtn.addEventListener('click',openModal);
  cancelBtn.addEventListener('click',closeModal);
  processNowBtn.addEventListener('click',completePurchase);
  viewOrdersBtn.addEventListener('click',()=>show('orders'));

  document.querySelectorAll('.nav-link').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const v=btn.dataset.view;
      if(v==='orders'){
        if(purchased){orderCard.hidden=false;noOrders.hidden=true;}
        show('orders');
      } else {
        show('shop');
      }
    });
  });

  updateCart();
})();
