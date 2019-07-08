const eventLockInit = () => {
    //  复原默认值
    const defalutLockOption = {
        lockDelay: 1000,
        lockStatus: false,
        needAutoUnlock: true,
        startTime: 0,
        endTime: 0
    };
    let lockOption = {
        //  自动解锁时长，默认1000ms
        lockDelay: 1000,
        //  lockStatus可以看做全局的锁状态，所有操作都将会围绕它展开
        lockStatus: false,
        //  是否需要自动解锁，默认需要
        needAutoUnlock: true,
        //  开始锁定的时间
        startTime: 0,
        //  解锁时间
        endTime: 0
    };
    let eventLock = {};

    function reloadOption() {
        // 不可以让lockOption与defalutLockOption指向同一块内存
        // 否则后续lockOption的改动会影响defalutLockOption
        lockOption = Object.assign({}, defalutLockOption);
    }

    eventLock.lock = (
        _ifNeedAutoUnlock = lockOption.needAutoUnlock,
        _unlockDelay = lockOption.lockDelay
    ) => {
        let _lockTime = Date.now();
        let _lockStatus = lockOption.lockStatus;
        if (lockOption.endTime && _lockTime > lockOption.endTime && _lockStatus) {
            reloadOption();
            _lockStatus = false;
        }
        if (!_lockStatus) {
            lockOption.lockStatus = true;
            lockOption.startTime = _lockTime;
            if (!_ifNeedAutoUnlock) {
                _unlockDelay = 10000;
            }
            lockOption.endTime = _lockTime + _unlockDelay;
        }
        return _lockStatus;
    };

    eventLock.unLock = _freeze => {
        if (_freeze) {
            reloadOption();
        } else {
            let _minLockDelay = 300;
            let _t = Date.now() - lockOption.startTime;
            if (_t >= _minLockDelay) {
                reloadOption();
            } else {
                setTimeout(() => {
                    reloadOption();
                }, _minLockDelay - _t);
            }
        }
    };

    eventLock.getLockStatus = () => lockOption.lockStatus;

    return eventLock;
};

// 防止按钮快速重复点击
// 在按钮点下时设置一个全局延时锁, 在锁关闭前不响应用户操作, 在1000ms的时间后锁会自动复位。
const eventDelayLock = () => {
    // 延时时间, ms
    let _defaultDelayTime = 1000;
    // 锁状态
    let _eventDelayLock = false;
    // 是否自动解锁
    let _autoUnlock = true;
    // 上锁的时间
    let _lockTime = 0;
    // 解锁时间
    let _unLockTime = 0;
    let _delayTime = 0;
    // 定时器类
    let _lock = {};

    // 不同平台特殊处理
    let _platform = "IOS";
    if (_platform === "IOS") {
        _defaultDelayTime = 500;
    }
    // 是否锁状态: true是, false不是
    // _ifAutoUnlock: 是否自动解锁, 必须提供, 不自动解锁默认时间是10秒
    // _delay: 解锁延时ms, 缺省_defaultDelayTime
    _lock.lock = function(_ifAutoUnlock, _delay) {
        let _t = Date.now();
        let _curLockState = _eventDelayLock;
        // 时间超过预定解锁时间, 不论是否自动解锁都返回解锁状态
        // 如果事件触发的间隔非常短, 这种情况不可能是人为的, 可能是因为事件多层绑定重复触发的, 这种情况就不用上锁
        // 人手点击的最高记录是17, 50ms可以保证不可能是人触发的
        let _validT = 100; // 使用组件会重复触发事件 一些手机小程序组件延时超过50ms，现改成100ms提高对低端机的兼容性
        if (_t >= _unLockTime || _t < _lockTime + _validT) {
            _curLockState = false;
            _eventDelayLock = false;
        }
        // 不在锁状态, 新的设置请求才会起作用
        if (!_curLockState) {
            _eventDelayLock = true;
            _autoUnlock = _ifAutoUnlock;
            _lockTime = _t;
            // 不自动解锁的默认时间是10秒
            !_autoUnlock && (_delay = 10000);
            _delayTime = _delay || _defaultDelayTime;
            _unLockTime = _lockTime + _delayTime;
        }
        return _curLockState;
    };
    // 清空锁状态, 同时清空定时器
    // _force: 立即解锁
    _lock.unLock = function(_force) {
        if (_force) {
            _eventDelayLock = false;
            _lockTime = 0;
            _unLockTime = 0;
        } else {
            // 锁之后解锁的最短时间
            let _minTime = _delayTime;
            if (_minTime > 300) {
                _minTime = 300;
            }
            // 避免太快解锁
            let _dt = Date.now() - _lockTime;
            if (_dt >= _minTime) {
                _eventDelayLock = false;
                _lockTime = 0;
                _unLockTime = 0;
            } else {
                setTimeout(function() {
                    _eventDelayLock = false;
                    _lockTime = 0;
                    _unLockTime = 0;
                }, _minTime - _dt);
            }
        }
    };
    _lock.getState = function() {
        return _eventDelayLock;
    };
    return _lock;
};

export const eventLock = eventLockInit();
export const eventLockDely = eventDelayLock();
// const elock1 = eventDelayLock;
// function a() {
//     console.log("点击了无锁--" + Date.now());
// }
// function b() {
//     if (eventLock.lock(true, 1000)) return;
//     console.log("点击了有锁--" + Date.now());
// }
