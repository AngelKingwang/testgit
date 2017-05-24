function scroll(opt){
	this.box = document.getElementById(opt.box);
	this.urlList = opt.urlList;
	this.times = opt.times || 3;

	this.init();
	this.create();
}

scroll.prototype = {
	//��ʼ�����ز���
	init:function(){
		this.boxWid = this.box.offsetWidth;
		this.boxHei = this.box.offsetHeight;
		this.index = 0;
	},
	//����Ԫ��
	create:function(){
		var box = this.box;
		var w = this.boxWid;
		var h = this.boxHei;
		//����ͼƬ����
		this.oUl = document.createElement('ul');
		box.appendChild(this.oUl);
		var list = this.urlList;
		for(var i = 0;i < list.length;i++){
			//����ͼƬ����ת����
			var oLi = document.createElement('li');
			oLi.style.cssText = 'width:'+w+'px;height:'+h+'px;list-style:none;opacity:1;filter:alpha(opacity=100);';

			var oA = document.createElement('a');
			oA.style.cssText = 'display:block;width:100%;height:100%;border:0;';
			oA.href = list[i].href;

			var img = document.createElement('img');
			img.style.cssText = 'display:block;width:100%;height:100%;border:0;'
			img.src = list[i].url;

			oA.appendChild(img);
			oLi.appendChild(oA);
			this.oUl.appendChild(oLi);
			//��������ͼ
			// var small = document.createElement('span');
			// small.index = i;
			// small.style.cssText = 'display:block;width:'+(w/list.length)+'px;height:'+(w/list.length)+'px;position:absolute;z-index:10;';
			//
			// small.style.background = 'url('+list[i].url+') center no-repeat';
			// small.style.backgroundSize = '100% 100%';
			// small.style.bottom = 0;
			// small.style.left = i * (w/list.length) + 'px';
			//
			// box.appendChild(small);
		}
		//�������Ұ�ť
		this.prev = document.createElement('a');
		this.prev.flag = 'prev';
		this.prev.innerHTML = '&lt;'
		this.prev.style.cssText = 'display:block;font-size:20px;color:#ffffff;background:rgba(0,0,0,0.4);position:absolute;padding:5px 10px;top:'+(h-30)/2+'px;z-index:100;text-decoration:none;display:none;';
		this.next = document.createElement('a');
		this.next.flag = 'next';
		this.next.innerHTML = '&gt;'
		this.next.href = this.prev.href = 'javascript:void(0);';
		this.next.style.cssText = this.prev.style.cssText;
		this.next.style.right = 0;
		this.prev.style.left = 0;
		box.appendChild(this.prev);
		box.appendChild(this.next);

	},
	//������
	move:function(){
		//�������ز���
		var box = this.box;
		var w = this.boxWid;
		var h = this.boxHei;
		var list = this.urlList;
		var ball = this.oUl;
		var cells = ball.children;
		//����������ʽ
		box.style.cssText = 'position:relative;overflow:hidden;';
		box.style.height =  450+'px';
		//����ͼƬ������ʽ
		ball.style.cssText = 'position:absolute;left:0;top:0;overflow:hidden;width:'+(cells.length+1)*w+'px;';
		for(var i = 0;i < cells.length;i++){
			cells[i].style.float = 'left';
		}
		//���Ƶ�һ��ͼƬ
		var first = cells[0].cloneNode(true);
		ball.appendChild(first);
		//��ʼ�ֲ�

		this.timer = setTimeout(move,this.times*1000);
		var self = this;
		var flag = true;
		//�Զ��ֲ�
		function move(){
			self.index--;
			// console.log(cells.length);
			//�߽��ж�
			if(self.index==-cells.length){
				self.index = -1;
				ball.style.left = 0;
			}
			//����
			animation(ball,'left',self.index*w,function(){
				clearTimeout(self.timer)
				if(flag){
					self.timer = setTimeout(move,self.times*1000);
				}
			})
		}
		//�л��¼�
		box.onmouseover = function(){
			flag = false;
			clearTimeout(self.timer);
			self.next.style.display = self.prev.style.display = 'block';
		}
		box.onmouseout = function(){
			flag = true;
			self.timer = setTimeout(move,self.times*1000);
			self.next.style.display = self.prev.style.display = 'none';
		}
		//�¼�ί��
		box.onclick = function(event){
			var e = event || window.event;
			//����ί���߶���
			var btn = e.target?e.target:e.srcElement;
			//����ͼ�����л�
			//�жϽڵ�
			if(btn.nodeName.toLowerCase()=='span'){
				if(self.index==-(cells.length-1)){
					ball.style.left = 0;
				}
				self.index = -btn.index;
				animation(ball,'left',self.index*w)
			}
			//���Ұ�ť�����л�
			//�жϽڵ�
			if(btn.flag == 'prev'){
				self.index++;
				if(self.index==1){
					self.index = -(list.length-1);
					ball.style.left = -list.length * w + 'px';
				}
				animation(ball,'left',self.index*w);
			}
			if(btn.flag == 'next'){
				self.index--;
				if(self.index==-cells.length){
					self.index = -1;
					ball.style.left = 0;
				}
				animation(ball,'left',self.index*w)
			}
		}
	},
	//���뵭����
	fade:function(){
		var box = this.box;
		var w = this.boxWid;
		var h = this.boxHei;
		var list = this.urlList;
		var ctnBox = this.oUl;
		var cells = ctnBox.children;
		//������ʽ
		box.style.cssText = 'position:relative;overflow:hidden;';
		box.style.height = (h + (w/list.length)) +'px';
		//ͼƬ��������
		ctnBox.style.cssText = 'width:'+w+'px;height:'+h+'px;position:relative;';

		for(var i = 0;i < cells.length;i++){
			cells[i].style.position = 'absolute';
			cells[i].style.left = 0;
			cells[i].style.top = 0;
			cells[i].style.opacity = 0;
			cells[i].style.filter = 'alpha(opacity=0)';
		}
		cells[0].style.opacity = 1;
		cells[0].style.filter = 'alpha(opacity=100)';
		//��ʼ�ֲ�
		var flag = true;
		var self = this;
		//�����Զ��ֲ�
		this.timer = setTimeout(fade,this.times*1000);
		function fade(){
			self.index++;
			if(self.index==cells.length){
				self.index = 0;
			}
			for(var i = 0;i < cells.length;i++){
				animation(cells[i],'opacity',0)
			}

			animation(cells[self.index],'opacity',1,function(){
				clearTimeout(self.timer)
				if(flag){
					self.timer = setTimeout(fade,self.times*1000);
				}
			})
		}
		//�����л�
		//�л��¼�
		box.onmouseover = function(){
			flag = false;
			clearTimeout(self.timer);
			self.next.style.display = self.prev.style.display = 'block';
		}
		box.onmouseout = function(){
			flag = true;
			self.timer = setTimeout(fade,self.times*1000);
			self.next.style.display = self.prev.style.display = 'none';
		}

		box.onclick = function(event){
			var e = event||window.event;
			var btn = e.target?e.target:e.srcElement;
			//����ͼ�л�
			if(btn.nodeName.toLowerCase()=='span'){
				self.index = btn.index;
				for(var i = 0;i < cells.length;i++){
					animation(cells[i],'opacity',0)
				}
				animation(cells[self.index],'opacity',1)
			}
			//�����л�
			if(btn.flag=='prev'){
				self.index--;
				if(self.index==-1){
					self.index = cells.length-1;
				}
				for(var i = 0;i < cells.length;i++){
					animation(cells[i],'opacity',0)
				}
				animation(cells[self.index],'opacity',1)
			}
			if(btn.flag == 'next'){
				self.index++;
				if(self.index==cells.length){
					self.index = 0;
				}
				for(var i = 0;i < cells.length;i++){
					animation(cells[i],'opacity',0)
				}
				animation(cells[self.index],'opacity',1)
			}
		}
	}
}
