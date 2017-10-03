
declare module BABYLON {
    enum GLTFLoaderCoordinateSystemMode {
        AUTO = 0,
        PASS_THROUGH = 1,
        FORCE_RIGHT_HANDED = 2,
    }
    interface IGLTFLoaderData {
        json: Object;
        bin: ArrayBufferView;
    }
    interface IGLTFLoader {
        importMeshAsync: (meshesNames: any, scene: Scene, data: IGLTFLoaderData, rootUrl: string, onSuccess: (meshes: AbstractMesh[], particleSystems: ParticleSystem[], skeletons: Skeleton[]) => void, onProgress: (event: ProgressEvent) => void, onError: (message: string) => void) => void;
        loadAsync: (scene: Scene, data: IGLTFLoaderData, rootUrl: string, onSuccess: () => void, onProgress: (event: ProgressEvent) => void, onError: (message: string) => void) => void;
    }
    class GLTFFileLoader implements ISceneLoaderPluginAsync {
        static CreateGLTFLoaderV1: (parent: GLTFFileLoader) => IGLTFLoader;
        static CreateGLTFLoaderV2: (parent: GLTFFileLoader) => IGLTFLoader;
        onParsed: (data: IGLTFLoaderData) => void;
        static HomogeneousCoordinates: boolean;
        static IncrementalLoading: boolean;
        coordinateSystemMode: GLTFLoaderCoordinateSystemMode;
        onTextureLoaded: (texture: BaseTexture) => void;
        onMaterialLoaded: (material: Material) => void;
        /**
         * Let the user decides if he needs to process the material (like precompilation) before affecting it to meshes
         */
        onBeforeMaterialReadyAsync: (material: Material, targetMesh: AbstractMesh, isLOD: boolean, callback: () => void) => void;
        /**
         * Raised when the visible components (geometry, materials, textures, etc.) are first ready to be rendered.
         * For assets with LODs, raised when the first LOD is complete.
         * For assets without LODs, raised when the model is complete just before onComplete.
         */
        onReady: () => void;
        /**
         * Raised when the asset is completely loaded, just before the loader is disposed.
         * For assets with LODs, raised when all of the LODs are complete.
         * For assets without LODs, raised when the model is complete just after onReady.
         */
        onComplete: () => void;
        name: string;
        extensions: ISceneLoaderPluginExtensions;
        importMeshAsync(meshesNames: any, scene: Scene, data: any, rootUrl: string, onSuccess: (meshes: AbstractMesh[], particleSystems: ParticleSystem[], skeletons: Skeleton[]) => void, onProgress: (event: ProgressEvent) => void, onError: (message: string) => void): void;
        loadAsync(scene: Scene, data: string | ArrayBuffer, rootUrl: string, onSuccess: () => void, onProgress: (event: ProgressEvent) => void, onError: (message: string) => void): void;
        canDirectLoad(data: string): boolean;
        private static _parse(data, onError);
        private _getLoader(loaderData, onError);
        private static _parseBinary(data, onError);
        private static _parseV1(binaryReader, onError);
        private static _parseV2(binaryReader, onError);
        private static _parseVersion(version);
        private static _compareVersion(a, b);
        private static _decodeBufferToText(view);
    }
}


declare module BABYLON.GLTF2 {
    /**
    * Enums
    */
    enum EComponentType {
        BYTE = 5120,
        UNSIGNED_BYTE = 5121,
        SHORT = 5122,
        UNSIGNED_SHORT = 5123,
        UNSIGNED_INT = 5125,
        FLOAT = 5126,
    }
    enum EMeshPrimitiveMode {
        POINTS = 0,
        LINES = 1,
        LINE_LOOP = 2,
        LINE_STRIP = 3,
        TRIANGLES = 4,
        TRIANGLE_STRIP = 5,
        TRIANGLE_FAN = 6,
    }
    enum ETextureMagFilter {
        NEAREST = 9728,
        LINEAR = 9729,
    }
    enum ETextureMinFilter {
        NEAREST = 9728,
        LINEAR = 9729,
        NEAREST_MIPMAP_NEAREST = 9984,
        LINEAR_MIPMAP_NEAREST = 9985,
        NEAREST_MIPMAP_LINEAR = 9986,
        LINEAR_MIPMAP_LINEAR = 9987,
    }
    enum ETextureWrapMode {
        CLAMP_TO_EDGE = 33071,
        MIRRORED_REPEAT = 33648,
        REPEAT = 10497,
    }
    /**
    * Interfaces
    */
    interface IGLTFProperty {
        extensions?: Object;
        extras?: any;
    }
    interface IGLTFChildRootProperty extends IGLTFProperty {
        name?: string;
    }
    interface IGLTFAccessorSparseIndices extends IGLTFProperty {
        bufferView: number;
        byteOffset?: number;
        componentType: EComponentType;
    }
    interface IGLTFAccessorSparseValues extends IGLTFProperty {
        bufferView: number;
        byteOffset?: number;
    }
    interface IGLTFAccessorSparse extends IGLTFProperty {
        count: number;
        indices: IGLTFAccessorSparseIndices;
        values: IGLTFAccessorSparseValues;
    }
    interface IGLTFAccessor extends IGLTFChildRootProperty {
        bufferView?: number;
        byteOffset?: number;
        componentType: EComponentType;
        normalized?: boolean;
        count: number;
        type: string;
        max: number[];
        min: number[];
        sparse?: IGLTFAccessorSparse;
    }
    interface IGLTFAnimationChannel extends IGLTFProperty {
        sampler: number;
        target: IGLTFAnimationChannelTarget;
    }
    interface IGLTFAnimationChannelTarget extends IGLTFProperty {
        node: number;
        path: string;
    }
    interface IGLTFAnimationSampler extends IGLTFProperty {
        input: number;
        interpolation?: string;
        output: number;
    }
    interface IGLTFAnimation extends IGLTFChildRootProperty {
        channels: IGLTFAnimationChannel[];
        samplers: IGLTFAnimationSampler[];
        targets?: any[];
    }
    interface IGLTFAsset extends IGLTFChildRootProperty {
        copyright?: string;
        generator?: string;
        version: string;
        minVersion?: string;
    }
    interface IGLTFBuffer extends IGLTFChildRootProperty {
        uri?: string;
        byteLength: number;
        loadedData: ArrayBufferView;
        loadedObservable: Observable<IGLTFBuffer>;
    }
    interface IGLTFBufferView extends IGLTFChildRootProperty {
        buffer: number;
        byteOffset?: number;
        byteLength: number;
        byteStride?: number;
    }
    interface IGLTFCameraOrthographic extends IGLTFProperty {
        xmag: number;
        ymag: number;
        zfar: number;
        znear: number;
    }
    interface IGLTFCameraPerspective extends IGLTFProperty {
        aspectRatio: number;
        yfov: number;
        zfar: number;
        znear: number;
    }
    interface IGLTFCamera extends IGLTFChildRootProperty {
        orthographic?: IGLTFCameraOrthographic;
        perspective?: IGLTFCameraPerspective;
        type: string;
    }
    interface IGLTFImage extends IGLTFChildRootProperty {
        uri?: string;
        mimeType?: string;
        bufferView?: number;
    }
    interface IGLTFMaterialNormalTextureInfo extends IGLTFTextureInfo {
        scale: number;
    }
    interface IGLTFMaterialOcclusionTextureInfo extends IGLTFTextureInfo {
        strength: number;
    }
    interface IGLTFMaterialPbrMetallicRoughness {
        baseColorFactor: number[];
        baseColorTexture: IGLTFTextureInfo;
        metallicFactor: number;
        roughnessFactor: number;
        metallicRoughnessTexture: IGLTFTextureInfo;
    }
    interface IGLTFMaterial extends IGLTFChildRootProperty {
        pbrMetallicRoughness?: IGLTFMaterialPbrMetallicRoughness;
        normalTexture?: IGLTFMaterialNormalTextureInfo;
        occlusionTexture?: IGLTFMaterialOcclusionTextureInfo;
        emissiveTexture?: IGLTFTextureInfo;
        emissiveFactor?: number[];
        alphaMode?: string;
        alphaCutoff: number;
        doubleSided?: boolean;
        index?: number;
        babylonMaterial?: Material;
    }
    interface IGLTFMeshPrimitive extends IGLTFProperty {
        attributes: {
            [name: string]: number;
        };
        indices?: number;
        material?: number;
        mode?: EMeshPrimitiveMode;
        targets?: {
            [name: string]: number;
        }[];
    }
    interface IGLTFMesh extends IGLTFChildRootProperty {
        primitives: IGLTFMeshPrimitive[];
        weights?: number[];
    }
    interface IGLTFNode extends IGLTFChildRootProperty {
        camera?: number;
        children?: number[];
        skin?: number;
        matrix?: number[];
        mesh?: number;
        rotation?: number[];
        scale?: number[];
        translation?: number[];
        weights?: number[];
        index?: number;
        parent?: IGLTFNode;
        babylonMesh?: Mesh;
        babylonBones?: {
            [skin: number]: Bone;
        };
        babylonAnimationTargets?: Node[];
    }
    interface IGLTFSampler extends IGLTFChildRootProperty {
        magFilter?: ETextureMagFilter;
        minFilter?: ETextureMinFilter;
        wrapS?: ETextureWrapMode;
        wrapT?: ETextureWrapMode;
    }
    interface IGLTFScene extends IGLTFChildRootProperty {
        nodes: number[];
    }
    interface IGLTFSkin extends IGLTFChildRootProperty {
        inverseBindMatrices?: number;
        skeleton?: number;
        joints: number[];
        index?: number;
        babylonSkeleton?: Skeleton;
    }
    interface IGLTFTexture extends IGLTFChildRootProperty {
        sampler?: number;
        source: number;
        url?: string;
        dataReadyObservable?: Observable<IGLTFTexture>;
    }
    interface IGLTFTextureInfo {
        index: number;
        texCoord?: number;
    }
    interface IGLTF extends IGLTFProperty {
        accessors?: IGLTFAccessor[];
        animations?: IGLTFAnimation[];
        asset: IGLTFAsset;
        buffers?: IGLTFBuffer[];
        bufferViews?: IGLTFBufferView[];
        cameras?: IGLTFCamera[];
        extensionsUsed?: string[];
        extensionsRequired?: string[];
        images?: IGLTFImage[];
        materials?: IGLTFMaterial[];
        meshes?: IGLTFMesh[];
        nodes?: IGLTFNode[];
        samplers?: IGLTFSampler[];
        scene?: number;
        scenes?: IGLTFScene[];
        skins?: IGLTFSkin[];
        textures?: IGLTFTexture[];
    }
}


declare module BABYLON.GLTF2 {
    class GLTFLoader implements IGLTFLoader, IDisposable {
        _gltf: IGLTF;
        _babylonScene: Scene;
        private _parent;
        private _rootUrl;
        private _defaultMaterial;
        private _successCallback;
        private _progressCallback;
        private _errorCallback;
        private _renderReady;
        private _disposed;
        private _renderReadyObservable;
        private _renderPendingCount;
        private _loaderPendingCount;
        private _loaderTrackers;
        static Extensions: {
            [name: string]: GLTFLoaderExtension;
        };
        static RegisterExtension(extension: GLTFLoaderExtension): void;
        constructor(parent: GLTFFileLoader);
        dispose(): void;
        importMeshAsync(meshesNames: any, scene: Scene, data: IGLTFLoaderData, rootUrl: string, onSuccess: (meshes: AbstractMesh[], particleSystems: ParticleSystem[], skeletons: Skeleton[]) => void, onProgress: (event: ProgressEvent) => void, onError: (message: string) => void): void;
        loadAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onSuccess: () => void, onProgress: (event: ProgressEvent) => void, onError: (message: string) => void): void;
        private _loadAsync(nodeNames, scene, data, rootUrl, onSuccess, onProgress, onError);
        private _onError(message);
        private _onProgress(event);
        _executeWhenRenderReady(func: () => void): void;
        private _onRenderReady();
        private _onComplete();
        private _loadData(data);
        private _getMeshes();
        private _getSkeletons();
        private _getAnimationTargets();
        private _startAnimations();
        private _loadScene(nodeNames);
        _loadNode(node: IGLTFNode): void;
        private _loadMesh(node, mesh);
        private _loadVertexDataAsync(primitive, onSuccess);
        private _createMorphTargets(node, mesh, primitive, babylonMesh);
        private _loadMorphTargetsData(mesh, primitive, vertexData, babylonMesh);
        private _loadTransform(node);
        private _loadSkin(skin);
        private _createBone(node, skin, parent, localMatrix, baseMatrix, index);
        private _loadBones(skin, inverseBindMatrixData);
        private _loadBone(node, skin, inverseBindMatrixData, babylonBones);
        private _getNodeMatrix(node);
        private _traverseNodes(indices, action, parentNode?);
        _traverseNode(index: number, action: (node: IGLTFNode, index: number, parentNode: IGLTFNode) => boolean, parentNode?: IGLTFNode): void;
        private _loadAnimations();
        private _loadAnimationChannel(animation, animationIndex, channelIndex);
        private _loadBufferAsync(index, onSuccess);
        private _buildInt8ArrayBuffer(buffer, byteOffset, byteLength, byteStride, bytePerComponent);
        private _buildUint8ArrayBuffer(buffer, byteOffset, byteLength, byteStride, bytePerComponent);
        private _buildInt16ArrayBuffer(buffer, byteOffset, byteLength, byteStride, bytePerComponent);
        private _buildUint16ArrayBuffer(buffer, byteOffset, byteLength, byteStride, bytePerComponent);
        private _buildUint32ArrayBuffer(buffer, byteOffset, byteLength, byteStride, bytePerComponent);
        private _buildFloat32ArrayBuffer(buffer, byteOffset, byteLength, byteStride, bytePerComponent);
        private _extractInterleavedData(sourceBuffer, targetBuffer, bytePerComponent, stride, length);
        private _loadBufferViewAsync(bufferView, byteOffset, byteLength, bytePerComponent, componentType, onSuccess);
        private _loadAccessorAsync(accessor, onSuccess);
        private _getByteStrideFromType(accessor);
        _addPendingData(data: any): void;
        _removePendingData(data: any): void;
        _addLoaderPendingData(data: any): void;
        _removeLoaderPendingData(data: any): void;
        _whenAction(action: () => void, onComplete: () => void): void;
        private _getDefaultMaterial();
        private _loadMaterialMetallicRoughnessProperties(material);
        _loadMaterial(material: IGLTFMaterial, assign: (babylonMaterial: Material, isNew: boolean) => void): void;
        _createPbrMaterial(material: IGLTFMaterial): void;
        _loadMaterialBaseProperties(material: IGLTFMaterial): void;
        _loadMaterialAlphaProperties(material: IGLTFMaterial, colorFactor?: number[]): void;
        _loadTexture(textureInfo: IGLTFTextureInfo): Texture;
    }
}


declare module BABYLON.GLTF2 {
    /**
    * Utils functions for GLTF
    */
    class GLTFUtils {
        /**
        * If the uri is a base64 string
        * @param uri: the uri to test
        */
        static IsBase64(uri: string): boolean;
        /**
        * Decode the base64 uri
        * @param uri: the uri to decode
        */
        static DecodeBase64(uri: string): ArrayBuffer;
        static ForEach(view: Uint16Array | Uint32Array | Float32Array, func: (nvalue: number, index: number) => void): void;
        static GetTextureWrapMode(mode: ETextureWrapMode): number;
        static GetTextureSamplingMode(magFilter: ETextureMagFilter, minFilter: ETextureMinFilter): number;
        /**
         * Decodes a buffer view into a string
         * @param view: the buffer view
         */
        static DecodeBufferToText(view: ArrayBufferView): string;
    }
}


declare module BABYLON.GLTF2 {
    abstract class GLTFLoaderExtension {
        enabled: boolean;
        readonly abstract name: string;
        protected _traverseNode(loader: GLTFLoader, index: number, action: (node: IGLTFNode, index: number, parentNode: IGLTFNode) => boolean, parentNode: IGLTFNode): boolean;
        protected _loadNode(loader: GLTFLoader, node: IGLTFNode): boolean;
        protected _loadMaterial(loader: GLTFLoader, material: IGLTFMaterial, assign: (babylonMaterial: Material, isNew: boolean) => void): boolean;
        protected _loadExtension<T>(property: IGLTFProperty, action: (extension: T, onComplete: () => void) => void): boolean;
        static _Extensions: GLTFLoaderExtension[];
        static TraverseNode(loader: GLTFLoader, index: number, action: (node: IGLTFNode, index: number, parentNode: IGLTFNode) => boolean, parentNode: IGLTFNode): boolean;
        static LoadNode(loader: GLTFLoader, node: IGLTFNode): boolean;
        static LoadMaterial(loader: GLTFLoader, material: IGLTFMaterial, assign: (babylonMaterial: Material, isNew: boolean) => void): boolean;
        private static _ApplyExtensions(action);
    }
}


declare module BABYLON.GLTF2.Extensions {
    class MSFTLOD extends GLTFLoaderExtension {
        /**
         * Specify the minimal delay between LODs in ms (default = 250)
         */
        static MinimalLODDelay: number;
        readonly name: string;
        protected _traverseNode(loader: GLTFLoader, index: number, action: (node: IGLTFNode, index: number, parentNode: IGLTFNode) => boolean, parentNode: IGLTFNode): boolean;
        protected _loadNode(loader: GLTFLoader, node: IGLTFNode): boolean;
        private _loadNodeLOD(loader, nodes, index, onComplete);
        protected _loadMaterial(loader: GLTFLoader, material: IGLTFMaterial, assign: (babylonMaterial: Material, isNew: boolean) => void): boolean;
        private _loadMaterialLOD(loader, materials, index, assign, onComplete);
    }
}


declare module BABYLON.GLTF2.Extensions {
    class KHRMaterialsPbrSpecularGlossiness extends GLTFLoaderExtension {
        readonly name: string;
        protected _loadMaterial(loader: GLTFLoader, material: IGLTFMaterial, assign: (babylonMaterial: Material, isNew: boolean) => void): boolean;
        private _loadSpecularGlossinessProperties(loader, material, properties);
    }
}
